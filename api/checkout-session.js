const { issueEntitlement, json, validatePaidSession } = require('./_entitlement');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return json(res, 405, { paid: false, error: 'Method not allowed' });
  }

  try {
    const sessionId = String(req.query?.session_id || '').trim();
    const { session, tier } = await validatePaidSession(sessionId);
    const entitlementCode = issueEntitlement(session.id, tier, session.created);
    const payload = JSON.parse(Buffer.from(entitlementCode.split('.')[1], 'base64url').toString('utf8'));
    return json(res, 200, {
      paid: true,
      tier,
      entitlementCode,
      expiresAt: new Date(payload.exp * 1000).toISOString(),
    });
  } catch (error) {
    return json(res, 400, { paid: false, error: error.message || 'Payment verification failed' });
  }
};
