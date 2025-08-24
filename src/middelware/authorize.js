export const permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: { message: 'Not authenticated' } });
    const role = req.user.role || 'client';
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return res.status(403).json({ error: { message: 'Forbidden' } });
    }
    next();
  };
};
