require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use environment variable or fallback to localhost (for local testing)
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/lead';

// POST route to receive lead from frontend and forward to n8n
app.post('/api/leads', async (req, res) => {
  const { name, email, company, message } = req.body;

  try {
    // Send to n8n webhook
    await axios.post(N8N_WEBHOOK_URL, {
      name,
      email,
      company,
      message,
    });

    return res.status(200).json({ message: 'Lead forwarded to n8n successfully!' });
  } catch (error) {
    console.error('Error forwarding to n8n:', error.message);
    return res.status(500).json({ error: 'Failed to send lead to n8n' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
