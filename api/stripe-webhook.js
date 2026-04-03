export const config = { runtime: 'edge' };

// ─────────────────────────────────────────────────────────────────────────────
// CryptoDeclare — Stripe Webhook Handler
// Deploy to: api/stripe-webhook.js  in your GitHub repo
//
// Required Vercel Environment Variables (set in Vercel dashboard):
//   STRIPE_WEBHOOK_SECRET   → Stripe Dashboard > Webhooks > Signing secret
//   RESEND_API_KEY          → resend.com API key
//   UNLOCK_CODE_PRO         → e.g. PRODECLARE99  (must match hash in index.html)
//   UNLOCK_CODE_BIZ         → e.g. BIZDECLARE299 (must match hash in index.html)
//   FROM_EMAIL              → hello@cryptodeclare.ch (verified domain in Resend)
//
// Register in Stripe Dashboard > Developers > Webhooks:
//   Endpoint URL:  https://cryptodeclare.ch/api/stripe-webhook
//   Listen for:    checkout.session.completed
//
// Test locally with Stripe CLI:
//   stripe listen --forward-to localhost:3000/api/stripe-webhook
//   stripe trigger checkout.session.completed
// ─────────────────────────────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
};

// ── Stripe signature verification (Web Crypto, Edge-compatible) ──────────────
async function verifyStripeSignature(rawBody, sigHeader, secret) {
  const parts = sigHeader.split(',').reduce((acc, part) => {
    const eq = part.indexOf('=');
    if (eq > -1) acc[part.slice(0, eq).trim()] = part.slice(eq + 1).trim();
    return acc;
  }, {});

  const timestamp = parts['t'];
  const v1        = parts['v1'];
  if (!timestamp || !v1) return false;

  // Reject replayed events older than 5 minutes
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (age > 300) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sigBytes = await crypto.subtle.sign(
    'HMAC', key, new TextEncoder().encode(signedPayload)
  );
  const computed = Array.from(new Uint8Array(sigBytes))
    .map(b => b.toString(16).padStart(2, '0')).join('');

  // Constant-time compare to avoid timing attacks
  if (computed.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ v1.charCodeAt(i);
  }
  return diff === 0;
}

// ── Determine plan from Stripe event data ────────────────────────────────────
// Stripe stores amounts in the smallest unit (Rappen for CHF).
// Pro = CHF 99  → 9900 Rappen
// Biz = CHF 299 → 29900 Rappen
// Set `metadata.plan = "pro" | "business"` on your Stripe Products for clarity.
function determinePlan(session) {
  const meta = session.metadata || {};
  if (meta.plan === 'business') return 'business';
  if (meta.plan === 'pro')      return 'pro';

  const amount = session.amount_total || session.amount_received || 0;
  if (amount >= 25000) return 'business'; // ≥ CHF 250
  if (amount >= 5000)  return 'pro';      // ≥ CHF 50
  return null;
}

// ── Beautiful unlock email via Resend ────────────────────────────────────────
async function sendUnlockEmail({ to, name, code, plan, resendKey, fromEmail }) {
  const planLabel  = plan === 'business' ? 'Business' : 'Pro';
  const colour     = plan === 'business' ? '#7C3AED' : '#1B6CA8';
  const features   = plan === 'business'
    ? ['Unlimited reports', 'All 21+ exchanges supported', 'AI tax advisor', 'Priority email support', 'Multi-year reporting']
    : ['Unlimited reports', 'All 21+ exchanges supported', 'AI tax advisor', 'Email support'];

  const featureRows = features
    .map(f => `<tr><td style="padding:5px 0;color:#374151;font-size:14px;">✓&nbsp;&nbsp;${f}</td></tr>`)
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your CryptoDeclare ${planLabel} unlock code</title>
</head>
<body style="margin:0;padding:0;background:#F3F4F6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr><td align="center" style="padding:40px 16px;">
    <table width="560" cellpadding="0" cellspacing="0" role="presentation"
           style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.1);max-width:100%;">

      <!-- Header -->
      <tr><td style="background:${colour};padding:36px 40px;text-align:center;">
        <p style="margin:0 0 6px;color:rgba(255,255,255,.75);font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">CryptoDeclare</p>
        <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;line-height:1.3;">
          Your ${planLabel} plan is active 🎉
        </h1>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:40px 40px 32px;">
        <p style="margin:0 0 20px;color:#111827;font-size:16px;">
          Hi ${name ? name.split(' ')[0] : 'there'},
        </p>
        <p style="margin:0 0 28px;color:#4B5563;font-size:15px;line-height:1.7;">
          Thank you for purchasing <strong style="color:#111827;">CryptoDeclare ${planLabel}</strong>.
          Use the code below to unlock your plan on the site — it takes less than 10 seconds.
        </p>

        <!-- Code box -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 32px;">
          <tr><td style="background:#F0F7FF;border:2px dashed ${colour};border-radius:10px;padding:28px 20px;text-align:center;">
            <p style="margin:0 0 10px;color:#6B7280;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">
              Your unlock code
            </p>
            <p style="margin:0;color:${colour};font-size:30px;font-weight:800;letter-spacing:5px;font-family:'Courier New',Courier,monospace;">
              ${code}
            </p>
          </td></tr>
        </table>

        <!-- Steps -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
               style="margin:0 0 28px;background:#F9FAFB;border-radius:8px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;color:#111827;font-weight:600;font-size:14px;">How to activate in 3 steps</p>
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding:5px 12px 5px 0;color:#6B7280;font-size:13px;vertical-align:top;">1.</td>
                <td style="padding:5px 0;color:#374151;font-size:14px;">Go to <a href="https://cryptodeclare.ch" style="color:${colour};font-weight:600;">cryptodeclare.ch</a></td>
              </tr>
              <tr>
                <td style="padding:5px 12px 5px 0;color:#6B7280;font-size:13px;vertical-align:top;">2.</td>
                <td style="padding:5px 0;color:#374151;font-size:14px;">Click <strong>"Enter unlock code"</strong> in the top banner</td>
              </tr>
              <tr>
                <td style="padding:5px 12px 5px 0;color:#6B7280;font-size:13px;vertical-align:top;">3.</td>
                <td style="padding:5px 0;color:#374151;font-size:14px;">Paste your code and click <strong>Unlock</strong></td>
              </tr>
            </table>
          </td></tr>
        </table>

        <!-- Features -->
        <p style="margin:0 0 10px;color:#111827;font-weight:600;font-size:14px;">What's included in ${planLabel}</p>
        <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 32px;">
          ${featureRows}
        </table>

        <p style="margin:0;color:#6B7280;font-size:13px;line-height:1.7;">
          Need help? Just reply to this email or write to
          <a href="mailto:hello@cryptodeclare.ch" style="color:${colour};">hello@cryptodeclare.ch</a> —
          we respond within 24 hours.
        </p>
      </td></tr>

      <!-- Divider -->
      <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #E5E7EB;margin:0;"></td></tr>

      <!-- Footer -->
      <tr><td style="padding:20px 40px;text-align:center;">
        <p style="margin:0;color:#9CA3AF;font-size:12px;line-height:1.6;">
          CryptoDeclare · Swiss Crypto Tax Reports<br>
          <a href="https://cryptodeclare.ch" style="color:#9CA3AF;text-decoration:none;">cryptodeclare.ch</a>
          &nbsp;·&nbsp;
          <a href="mailto:hello@cryptodeclare.ch" style="color:#9CA3AF;text-decoration:none;">hello@cryptodeclare.ch</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      from:    `CryptoDeclare <${fromEmail}>`,
      to:      [to],
      subject: `Your CryptoDeclare ${planLabel} unlock code`,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '(no body)');
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
  return res.json();
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: CORS });
  }

  // Check env vars
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const resendKey     = process.env.RESEND_API_KEY;
  const fromEmail     = process.env.FROM_EMAIL || 'hello@cryptodeclare.ch';
  const codePro       = process.env.UNLOCK_CODE_PRO;
  const codeBiz       = process.env.UNLOCK_CODE_BIZ;

  if (!webhookSecret || !resendKey || !codePro || !codeBiz) {
    console.error('[stripe-webhook] missing env vars — check Vercel dashboard');
    return new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  // Verify Stripe signature
  const sigHeader = req.headers.get('stripe-signature');
  if (!sigHeader) {
    return new Response(JSON.stringify({ error: 'Missing Stripe-Signature header' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  const rawBody = await req.text();

  let signatureValid = false;
  try { signatureValid = await verifyStripeSignature(rawBody, sigHeader, webhookSecret); }
  catch (err) { console.error('[stripe-webhook] signature verification threw:', err.message); }

  if (!signatureValid) {
    return new Response(JSON.stringify({ error: 'Signature verification failed' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  // Parse event
  let event;
  try { event = JSON.parse(rawBody); }
  catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  const type    = event.type;
  const session = event.data?.object ?? {};

  console.log(`[stripe-webhook] received event: ${type}`);

  // Only handle completed checkouts
  if (type !== 'checkout.session.completed') {
    return new Response(JSON.stringify({ received: true, skipped: type }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  // Determine plan tier
  const plan = determinePlan(session);
  if (!plan) {
    console.warn('[stripe-webhook] could not determine plan — amount:', session.amount_total);
    return new Response(JSON.stringify({ received: true, warning: 'unknown_plan' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  // Extract customer email
  const customerEmail = session.customer_details?.email
    || session.customer_email
    || session.receipt_email
    || null;

  if (!customerEmail) {
    console.warn('[stripe-webhook] no customer email found in event');
    return new Response(JSON.stringify({ received: true, warning: 'no_email' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  const customerName = session.customer_details?.name || null;
  const code         = plan === 'business' ? codeBiz : codePro;

  // Send the email
  try {
    await sendUnlockEmail({ to: customerEmail, name: customerName, code, plan, resendKey, fromEmail });
    console.log(`[stripe-webhook] ✓ sent ${plan} code to ${customerEmail}`);
  } catch (err) {
    // Return 200 so Stripe doesn't retry — email failures are logged, not retried by Stripe
    console.error('[stripe-webhook] email send failed:', err.message);
    return new Response(JSON.stringify({
      received: true,
      plan,
      emailError: err.message,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...CORS }
    });
  }

  return new Response(JSON.stringify({ received: true, plan, sent: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}
