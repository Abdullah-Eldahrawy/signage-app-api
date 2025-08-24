import axios from 'axios';
import https from 'https';

export const forwardSignageRequest = async (req, res) => {
  try {
    const apiUrl = "https://cpd-cp4ba.apps.automation.sumerge.com/bas/automationservices/rest/SB/SR082_7/Signage%20Intake%20API/createSignageRequest";

    const username = 'fnadmin';
    const password = 'P@ssw00rd';

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    // Extract signageRequest from the request body
    const { signageRequest } = req.body;
    console.log('Received signageRequest:', signageRequest);
    console.log('posting from:', apiUrl);
    if (!signageRequest) {
      return res.status(400).json({ 
        error: 'Missing signageRequest in request body' 
      });
    }

    // Prepare the payload for CP4BA
    const cp4baPayload = {
      "signageRequest":{
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