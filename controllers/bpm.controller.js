import axios from 'axios';
import https from 'https';

export const forwardSignageRequest = async (req, res) => {
  try {
    const apiUrl = 'https://cpd-cp4ba.apps.automation.sumerge.com/bas/automationservices/rest/SB/V1/Signage%20Intake%20API/createSignageRequest';

    const username = 'fnadmin';
    const password = 'P@ssw00rd';

    const agent = new https.Agent({
        rejectUnauthorized: false // 🚨 disables SSL check
    });

    const response = await axios.post(apiUrl, req.body, {
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
