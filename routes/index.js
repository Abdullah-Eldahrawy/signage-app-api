import { Router } from 'express';
import authRoutes from './auth.routes.js';
import bpmRoutes from './bpm.routes.js';
import modificationRoutes from './modification.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true }));
router.use('/auth', authRoutes);
router.use('/bpm', bpmRoutes);
router.use('/modifications', modificationRoutes);

export default router;
