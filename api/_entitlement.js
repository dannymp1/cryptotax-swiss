const crypto = require('crypto');

const PLAN_BY_AMOUNT = Object.freeze({
  8900: 'standard',
  14900: 'pro',
  29900: 'business',
});

const PLAN_LABELS = Object.freeze({
  standard: 'Standard',
  pro: 'Pro',
  business: 'Business',
});

const PAYMENT_LINK_ENV_BY_PLAN = Object.freeze({
  standard: 'STRIPE_PAYMENT_LINK_STANDARD',
  pro: 'STRIPE_PAYMENT_LINK_PRO',
  business: 'STRIPE_PAYMENT_LINK_BUSINESS',
});

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

function sign(value) {
  return crypto
    .createHmac('sha256', requiredEnv('ENTITLEMENT_SECRET'))
    .update(value)
    .digest('base64url');
}

function safeEqual(left, right) {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function paymentLinkId(value) {
  if (value && typeof value === 'object') return String(value.id || '');
  return String(value || '');
}

function allowedPaymentLinks(tier) {
  const envName = PAYMENT_LINK_ENV_BY_PLAN[tier];
  if (!envName) throw new Error('Checkout plan is not supported');
  return requiredEnv(envName)
    .split(',')
    .map(value => value.trim())
    .filter(value => /^plink_[A-Za-z0-9]+$/.test(value));
}

function issueEntitlement(sessionId, tier, purchasedAt) {
  if (!sessionId || !PLAN_LABELS[tier]) throw new Error('Invalid entitlement input');
  const now = Math.floor(Date.now() / 1000);
  const purchaseTimestamp = Number(purchasedAt);
  const issuedAt = Number.isFinite(purchaseTimestamp) && purchaseTimestamp > 0 && purchaseTimestamp <= now
    ? Math.floor(purchaseTimestamp)
    : now;
  const expiresAt = issuedAt + (400 * 24 * 60 * 60);
  if (expiresAt <= now) throw new Error('This purchase entitlement has expired');
  const payload = base64url(JSON.stringify({
    v: 1,
    sessionId,
    tier,
    iat: issuedAt,
    exp: expiresAt,
  }));
  return `CD1.${payload}.${sign(`CD1.${payload}`)}`;
}

function decodeEntitlement(code) {
  const parts = String(code || '').split('.');
  if (parts.length !== 3 || parts[0] !== 'CD1') throw new Error('Invalid unlock code');
  const signedValue = `${parts[0]}.${parts[1]}`;
  if (!safeEqual(sign(signedValue), parts[2])) throw new Error('Invalid unlock code');

  let payload;
  try {
    payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch (error) {
    throw new Error('Invalid unlock code');
  }
  if (payload.v !== 1 || !payload.sessionId || !PLAN_LABELS[payload.tier]) {
    throw new Error('Invalid unlock code');
  }
  if (!Number.isFinite(payload.exp) || payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new Error('This unlock code has expired');
  }
  return payload;
}

function tierForSession(session) {
  const amount = Number(session && session.amount_total);
  const currency = String(session && session.currency || '').toLowerCase();
  const tier = PLAN_BY_AMOUNT[amount];
  if (currency !== 'chf' || !tier) throw new Error('Checkout amount does not match a CryptoDeclare plan');
  const linkId = paymentLinkId(session && session.payment_link);
  if (!linkId || !allowedPaymentLinks(tier).includes(linkId)) {
    throw new Error('Checkout Session was not created by an approved CryptoDeclare Payment Link');
  }
  return tier;
}

async function retrieveStripeSession(sessionId) {
  if (!/^cs_(test_)?[A-Za-z0-9_]+$/.test(String(sessionId || ''))) {
    throw new Error('Invalid Checkout Session');
  }
  const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}?expand%5B%5D=payment_intent.latest_charge`, {
    headers: { Authorization: `Bearer ${requiredEnv('STRIPE_SECRET_KEY')}` },
  });
  const session = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(session.error?.message || 'Stripe could not verify this payment');
  return session;
}

async function validatePaidSession(sessionId, expectedTier) {
  const session = await retrieveStripeSession(sessionId);
  if (session.payment_status !== 'paid' || session.status !== 'complete') {
    throw new Error('Payment is not complete');
  }
  const latestCharge = session.payment_intent && typeof session.payment_intent === 'object'
    ? session.payment_intent.latest_charge
    : null;
  if (latestCharge && typeof latestCharge === 'object' && (latestCharge.refunded || Number(latestCharge.amount_refunded) > 0)) {
    throw new Error('This payment has been refunded');
  }
  const tier = tierForSession(session);
  if (expectedTier && tier !== expectedTier) throw new Error('Unlock code plan does not match the payment');
  return { session, tier };
}

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

module.exports = {
  PLAN_LABELS,
  decodeEntitlement,
  issueEntitlement,
  json,
  tierForSession,
  validatePaidSession,
};
