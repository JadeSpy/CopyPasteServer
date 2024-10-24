import express from 'express';
import clipboard from 'clipboardy';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint to set clipboard
app.post('/setClipboard', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required in request body' });
    }

    clipboard.writeSync(text);
    console.log("set clipboard to", text)
    res.json({ success: true, message: 'Clipboard content updated' });
  } catch (error) {
    console.error('Error setting clipboard:', error);
    res.status(500).json({ error: 'Failed to set clipboard content' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});