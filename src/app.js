const NodeWebcam = require("node-webcam");
const path = require("path");
const express = require("express");
const app = express();

// Webcam capture options
const opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false
};

// Initialize webcam
const Webcam = NodeWebcam.create(opts);

// Function to capture a photo and overwrite the same file
function capturePhoto() {
    const filePath = path.join(__dirname, "public/photo.jpg");
    Webcam.capture(filePath, (err, data) => {
        if (err) {
            console.error("Photo capture failed: ", err);
        } else {
            console.log("Photo captured: ", data);
        }
    });
}

// Schedule the job to run every 250 milliseconds (quarter second)
const interval = 250;
setInterval(capturePhoto, interval);

app.get('/photo.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/photo.jpg'));
});

app.get('/output.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/output.jpg'));
});

// Setup express to serve the static file
app.use(express.static('./public'));




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
    console.log('Web server started at http://localhost:3000');
});

console.log("Webcam photo capture started. Press Ctrl+C to stop.");
