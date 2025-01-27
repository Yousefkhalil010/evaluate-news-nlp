// Import required dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const aylien = require('aylien_textapi');
const path = require('path');

// Configure Aylien API
const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY,
});

// Create an instance of Express
const app = express();

// Middleware configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve the static client files from the 'dist' folder
app.use(express.static('dist'));

// Routes
// GET: Serve the main page
app.get('/', (req, res) => {
    res.sendFile('dist/index.html', { root: path.join(__dirname) });
});

// POST: Route for analyzing article sentiment
app.post('/add', (req, res) => {
    const { url } = req.body;
    console.log(`[Server] URL received: ${url}`);

    // Use Aylien API to analyze sentiment
    textapi.sentiment({ url }, (error, response) => {
        if (error) {
            console.error('[Server] Error analyzing sentiment:', error);
            res.status(500).send('Error analyzing the article. Please try again later.');
        } else {
            console.log('[Server] Sentiment analysis data received:', response);
            res.status(200).send(response);
        }
    });
});

// Server Configuration
const PORT = 8008;
app.listen(PORT, () => {
    console.log(`[Server] Listening on port: ${PORT}`);
});
