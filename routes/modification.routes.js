import { Router } from 'express';
import { createModification, getModificationsForSignage } from '../controllers/modification.Controller.js';
import auth from '../src/middelware/auth.js';
import basicAuth from '../src/middelware/basicAuth.js';
import { permit } from '../src/middelware/authorize.js';

const router = Router();

//================ Admin Routes ====================//
/**
 * @swagger
 * /modification/createModoficationReq:
 *   post:
 *     summary: Create a modification for a signage request (admin only - Basic auth service account)
 *     tags: [modifications]
 *     security:
 *       - basic: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - notes
 *               - signageRequestId
 *             properties:
 *               notes:
 *                 type: array
 *                 items:
 *                   type: string
 *               signageRequestId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Modification created
 */
router.post('/createModoficationReq', basicAuth, permit('admin'), createModification);

//================ Client Routes ====================//
/**
 * @swagger
 * /modification/signage/{id}:
 *   get:
 *     summary: Get modifications for a signage request (authenticated users)
 *     tags: [modifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Array of modifications
 *       401:
 *         description: Unauthorized
 */
router.get('/signage/:id', auth, getModificationsForSignage);