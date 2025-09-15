import { Buffer } from 'buffer';

// Basic auth middleware that validates credentials from env vars
// Sets req.user = { id, role: 'admin' } on success so existing permit('admin') continues to work
export default (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    if (!auth.startsWith('Basic ')) {
      return res.status(401).json({ error: { message: 'Missing Basic authorization header' } });
    }

    const b64 = auth.slice(6);
    let decoded;
    try {
      decoded = Buffer.from(b64, 'base64').toString('utf8');
    } catch (err) {
      return res.status(401).json({ error: { message: 'Invalid Basic auth encoding' } });
    }

    const sep = decoded.indexOf(':');
    if (sep === -1) return res.status(401).json({ error: { message: 'Invalid Basic auth format' } });

    const username = decoded.slice(0, sep);
    const password = decoded.slice(sep + 1);

    const expectedUser = process.env.CP4BA_USERNAME;
    const expectedPass = process.env.CP4BA_PASSWORD;
    if (!expectedUser || !expectedPass) {
      return res.status(500).json({ error: { message: 'Basic auth not configured on server' } });
    }

    if (username === expectedUser && password === expectedPass) {
      // Map basic-authenticated requests to an admin user context so existing `permit('admin')` works
      req.user = { id: `basic:${username}`, role: 'admin' };
      return next();
    }

    return res.status(401).json({ error: { message: 'Invalid Basic credentials' } });
  } catch (err) {
    return res.status(500).json({ error: { message: 'Basic auth failure' } });
  }
};
