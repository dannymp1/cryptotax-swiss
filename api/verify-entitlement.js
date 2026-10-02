const { decodeEntitlement, json, validatePaidSession } = require('./_entitlement');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { valid: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const code = String(body.code || '').trim();
    if (code.length < 40 || code.length > 1024) throw new Error('Invalid unlock code');
    const entitlement = decodeEntitlement(code);
    const { tier } = await validatePaidSession(entitlement.sessionId, entitlement.tier);
    return json(res, 200, {
      valid: true,
      tier,
      expiresAt: new Date(entitlement.exp * 1000).toISOString(),
    });
  } catch (error) {
    return json(res, 401, { valid: false, error: error.message || 'Unlock code verification failed' });
  }
};
