const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors())
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');

// Create a simple mongoose model
const FormEntry = mongoose.model('FormEntry', {
  name: String,
  email: String,
  message: String,
});

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new form entry in MongoDB
    const formEntry = new FormEntry({ name, email, message });
    await formEntry.save();
    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
