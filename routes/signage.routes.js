import { Router } from 'express';
import { updateStageStatus } from '../controllers/signage.Controller.js';
import basicAuth from '../src/middelware/basicAuth.js';
import { permit } from '../src/middelware/authorize.js';

const router = Router();

/**
 * @swagger
 * /signage/requests/{id}/status:
 *   patch:
 *     summary: Admin update of a signage request current stage status
 *     tags: [admin]
 *     security:
 *       - basic: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['pending','approved','rejected','Requires Modification']
 *     responses:
 *       201:
 *         description: Status updated successfully (no content)
 *       400:
 *         description: Invalid request
 */
router.patch('/requests/:id/status', basicAuth, permit('admin'), updateStageStatus);


export default router;