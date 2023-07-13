const express = require('express');
const WebSocket = require('ws');
const mongoose = require('mongoose');

// Connect to local mongodb database
mongoose.connect('mongodb://localhost:27017/datatest', {
  useNewUrlParser: true, useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB.');
});

// Define the MongoDB schema and model:
const recordSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now }, symbol: String, price: Number,
});

const Record = mongoose.model('Record', recordSchema);

// Create a WebSocket server
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Process and handle the received message (WebSocket data)
    // Store it in the MongoDB database
    const data = JSON.parse(message);

    // Example: Create a MongoDB document and save it
    const record = new Record(data);
    record.save((err) => {
      if (err) {
        console.error('Error saving record:', err);
      }
    });
  });
});

// Search endpoint
app.get('/search', async (req, res) => {
  const filter = req.query.filter;

  try {
    const results = await Record.find({ symbol: filter }).sort({ timestamp: -1 }).exec();
    res.json(results);
  } catch (error) {
    console.error('Error searching records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
