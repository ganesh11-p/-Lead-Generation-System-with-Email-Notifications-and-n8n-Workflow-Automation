const axios = require('axios');

// Replace with your actual n8n webhook URL
const N8N_WEBHOOK_URL = "http://localhost:5678/webhook/lead";

exports.processLead = async (req, res) => {
  const { name, email, company, message } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  // Optional: Validate email format (simple regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    // Forward lead data to n8n webhook
    await axios.post(N8N_WEBHOOK_URL, { name, email, company, message });

    return res.status(200).json({ message: 'Lead received and forwarded successfully.' });
  } catch (error) {
  if (error.response) {
    // Server responded with a status code outside 2xx
    console.error('Error response from n8n:', error.response.status, error.response.data);
  } else if (error.request) {
    // Request was made but no response received
    console.error('No response received from n8n:', error.request);
  } else {
    // Something else happened
    console.error('Error forwarding to n8n:', error.message);
  }
  return res.status(500).json({ error: 'Failed to forward lead data.' });
}

};
