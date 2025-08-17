import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { registerSchema, loginSchema } from '../validators/auth.schema.js';

export const register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.message } });

    const { email, name, password } = value;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: { message: 'Email already in use' } });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, name, passwordHash });

    const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, token });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: { message: error.message } });

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: { message: 'Invalid credentials' } });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: { message: 'Invalid credentials' } });

    const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
  } catch (err) { next(err); }
};
