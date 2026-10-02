const crypto = require('crypto');
const { PLAN_LABELS, issueEntitlement, json, tierForSession } = require('./_entitlement');

module.exports.config = { api: { bodyParser: false } };

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function verifyStripeSignature(rawBody, signatureHeader) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  const parts = String(signatureHeader || '').split(',').map(part => part.split('='));
  const timestamp = Number(parts.find(([key]) => key === 't')?.[1]);
  const signatures = parts.filter(([key]) => key === 'v1').map(([, value]) => String(value || ''));
  if (!Number.isFinite(timestamp) || Math.abs(Date.now() / 1000 - timestamp) > 300) {
    throw new Error('Webhook timestamp is outside the allowed window');
  }
  const expected = crypto.createHmac('sha256', webhookSecret)
    .update(`${timestamp}.${rawBody.toString('utf8')}`)
    .digest('hex');
  const expectedBuffer = Buffer.from(expected);
  const matches = signatures.some(signature => {
    const candidate = Buffer.from(signature);
    return expectedBuffer.length === candidate.length && crypto.timingSafeEqual(expectedBuffer, candidate);
  });
  if (!matches) throw new Error('Invalid webhook signature');
}

async function emailEntitlement(eventId, session, tier, code) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = session.customer_details?.email || session.customer_email;
  if (!apiKey || !recipient) throw new Error('Transactional email is not configured');
  const plan = PLAN_LABELS[tier];
  // Put the credential in the URL fragment so browsers never send it in HTTP
  // requests, referrer headers or hosting access logs.
  const activationUrl = `https://www.cryptodeclare.ch/#code=${encodeURIComponent(code)}`;
  const plainText = [
    `Thank you for purchasing CryptoDeclare ${plan}.`,
    '',
    `Activate your plan: ${activationUrl}`,
    '',
    'If the link does not work, paste this code into CryptoDeclare:',
    code,
    '',
    'This entitlement expires after 400 days.',
  ].join('\n');
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      // Stripe can emit both completion event types for the same Checkout
      // Session. Keying by session avoids sending the customer twice.
      'Idempotency-Key': `cryptodeclare-${session.id}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'CryptoDeclare <hello@cryptodeclare.ch>',
      to: [recipient],
      subject: `Your CryptoDeclare ${plan} unlock code`,
      html: `<p>Thank you for purchasing CryptoDeclare ${plan}.</p><p><a href="${activationUrl}">Activate your plan</a></p><p>If the button does not work, paste this code into CryptoDeclare:</p><p style="word-break:break-all;font-family:monospace">${code}</p><p>This entitlement expires after 400 days.</p>`,
      text: plainText,
    }),
  });
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.message || 'The unlock email could not be sent');
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { received: false });
  }

  try {
    const rawBody = await readRawBody(req);
    verifyStripeSignature(rawBody, req.headers['stripe-signature']);
    const event = JSON.parse(rawBody.toString('utf8'));
    const supported = ['checkout.session.completed', 'checkout.session.async_payment_succeeded'];
    if (!supported.includes(event.type)) return json(res, 200, { received: true });

    const session = event.data?.object;
    if (!session || session.payment_status !== 'paid') return json(res, 200, { received: true });
    const tier = tierForSession(session);
    const code = issueEntitlement(session.id, tier, session.created);
    await emailEntitlement(event.id, session, tier, code);
    return json(res, 200, { received: true });
  } catch (error) {
    console.error('Stripe webhook failed:', error.message);
    return json(res, 400, { received: false, error: 'Webhook processing failed' });
  }
};
