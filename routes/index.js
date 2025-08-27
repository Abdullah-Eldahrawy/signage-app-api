import { Router } from 'express';
import authRoutes from './auth.routes.js';
import bpmRoutes from './bpm.routes.js';
// import adminRoutes from './admin.routes.js';
import signageRoutes from './signage.routes.js';
import modificationRoutes from './modification.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true }));
router.use('/auth', authRoutes);
router.use('/bpm', bpmRoutes);
// router.use('/admin', adminRoutes);
router.use('/signage', signageRoutes);
router.use('/modification', modificationRoutes);

export default router;
