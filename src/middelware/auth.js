import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return res.status(401).json({ error: { message: 'Missing token' } });
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: { message: 'Invalid or expired token' } });
  }
};
