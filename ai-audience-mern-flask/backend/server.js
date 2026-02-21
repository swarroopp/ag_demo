const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Set up multer for temporary file storage
const uploadDir = path.join(__dirname, 'temp_uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({ storage: storage });

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'node-backend' });
});

// Endpoint to receive video from React and forward to Python Flask
app.post('/api/upload', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No video file uploaded' });
    }

    const filePath = req.file.path;
    console.log(`Received file: ${req.file.originalname}, forwarding to AI Engine...`);

    try {
        // Create form data to send to Flask
        const formData = new FormData();
        formData.append('video', fs.createReadStream(filePath));

        // Forward to Python Flask Application (assuming it runs on port 5000)
        const flaskResponse = await axios.post('http://127.0.0.1:5000/api/analyze-video', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            // Increase timeout for large files / simulated ML processing
            timeout: 300000
        });

        console.log('Successfully received analysis from AI Engine');

        // Return the Flask response back to the React client
        res.json(flaskResponse.data);

    } catch (error) {
        console.error('Error forwarding to AI Engine:', error.message);
        const errorMessage = error.response ? error.response.data : 'Internal server error communicating with AI engine';
        res.status(500).json({ error: errorMessage });
    } finally {
        // Clean up the temporary file on the Node server
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`Cleaned up temp Node file: ${filePath}`);
            }
        } catch (cleanupError) {
            console.error(`Failed to cleanup temp file: ${cleanupError}`);
        }
    }
});

app.listen(PORT, () => {
    console.log(`Node Express server running on port ${PORT}`);
});
