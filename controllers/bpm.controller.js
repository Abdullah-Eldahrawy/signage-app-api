import axios from 'axios';
import https from 'https';
import SignageRequest from '../models/SignageRequest.js';
import Modification from '../models/Modification.js';

export const forwardSignageRequest = async (req, res) => {
  try {
    const apiUrl = "https://cpd-cp4ba.apps.automation.sumerge.com/bas/automationservices/rest/SB/SR08_13/Signage%20Intake%20API/createSignageRequest";

    const username = 'fnadmin';
    const password = 'P@ssw00rd';

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });
    const { signageRequest } = req.body;

    if (!signageRequest) {
      return res.status(400).json({ 
        error: 'Missing signageRequest in request body' 
      });
    }

    try {
      const doc = new SignageRequest({
        fullName: signageRequest.fullName,
        installationDate: signageRequest.installationDate,
        installationAddress: signageRequest.installationAddress,
        mountingSurface: signageRequest.mountingSurface,
        signWidth: signageRequest.signWidth,
        signHeight: signageRequest.signHeight,
        displayType: signageRequest.displayType,
        viewingDistance: signageRequest.viewingDistance,
        primaryMessage: signageRequest.primaryMessage,
        secondaryInfo: signageRequest.secondaryInfo,
        colors: signageRequest.colors,
        attachments: signageRequest.attachments || [],
        status: signageRequest.status || 'pending',
        user: req.user && req.user.id ? req.user.id : undefined
      });
      await doc.save();
      signageRequest._id = doc._id;
    } catch (err) {
      console.error('Failed to persist signage request:', err.message || err);
    }

    // Prepare the payload for CP4BA
    const cp4baPayload = {
      "signageRequest":{
        id: signageRequest._id ? signageRequest._id.toString() : undefined,
        userId: req.user && req.user.id ? req.user.id.toString() : undefined,
        fullName: signageRequest.fullName,
        installationDate: signageRequest.installationDate,
        installationAddress: signageRequest.installationAddress,
        mountingSurface: signageRequest.mountingSurface,
        signWidth: signageRequest.signWidth,
        signHeight: signageRequest.signHeight,
        displayType: signageRequest.displayType,
        viewingDistance: signageRequest.viewingDistance,
        primaryMessage: signageRequest.primaryMessage,
        secondaryInfo: signageRequest.secondaryInfo,
        colors: signageRequest.colors,
        attachments: signageRequest.attachments || []
      }
    };

    const response = await axios.post(apiUrl,cp4baPayload, {
      httpsAgent: agent,
      auth: {
        username,
        password
      },
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Error forwarding signage request:', error.message);

    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data
      });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const listSignageRequests = async (req, res, next) => {
  try {
    const filter = {};
    // clients see only their requests
    if (req.user && req.user.role === 'client') filter.user = req.user.id;
    const items = await SignageRequest.find(filter).populate('user', 'email name');
    res.json(items);
  } catch (err) { next(err); }
};

export const getSignageRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await SignageRequest.findById(id).populate('user', 'email name');
    if (!item) return res.status(404).json({ error: { message: 'Not found' } });
    // clients can only access their own
    if (req.user && req.user.role === 'client' && item.user._id.toString() !== req.user.id) return res.status(403).json({ error: { message: 'Forbidden' } });
    res.json(item);
  } catch (err) { next(err); }
};

export const getModificationsForSignage = async (req, res, next) => {
  try {
    const { id } = req.params;
    // ensure signage exists
    const signage = await SignageRequest.findById(id);
    if (!signage) return res.status(404).json({ error: { message: 'Signage request not found' } });
    // clients can only access their propre modifications
    if (req.user && req.user.role === 'client' && signage.user.toString() !== req.user.id) return res.status(403).json({ error: { message: 'Forbidden' } });
    const modifications = await Modification.find({ signageRequest: id }).populate('author', 'email name');
    res.json(modifications);
  } catch (err) { next(err); }
};