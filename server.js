const express = require('express');
const clipboard = require('clipboardy');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Load SSL certificate and key
const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')), // or 'server.key'
  cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')) // or 'server.cert'
};

// POST endpoint to set clipboard
app.post('/setClipboard', (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required in request body' });
    }

    clipboard.writeSync(text);
    console.log("Set clipboard to:", text);
    res.json({ success: true, message: 'Clipboard content updated' });
  } catch (error) {
    console.error('Error setting clipboard:', error);
    res.status(500).json({ error: 'Failed to set clipboard content' });
  }
});

const PORT = process.env.PORT || 3000;

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running at https://localhost:${PORT}`);
});
