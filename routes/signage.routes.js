import { Router } from 'express';
import { updateStageStatus, getRequestsForUser } from '../controllers/signage.Controller.js';
import auth from '../src/middelware/auth.js';
import basicAuth from '../src/middelware/basicAuth.js';
import { permit } from '../src/middelware/authorize.js';

const router = Router();

//================ Admin Routes ====================//
/**
 * @swagger
 * /signage/requests/{id}/status:
 *   patch:
 *     summary: Admin update of a signage request current stage status
 *     tags: [signage]
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

//================ Client Routes ====================//
/**
 * @swagger
 * /signage/requests:
 *   get:
 *     summary: Get all signage requests for the authenticated user
 *     tags: [signage]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of signage requests for the user
 *       401:
 *         description: Unauthorized
 */
router.get('/requests', auth, getRequestsForUser);


export default router;