const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const imageBuffer = req.file.buffer;

        // Generate puzzle and get puzzle link
        const puzzleLink = await generatePuzzle(imageBuffer);

        res.json({ link: puzzleLink });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function generatePuzzle(imageBuffer) {
    // Load the image using Jimp
    const originalImage = await Jimp.read(imageBuffer);

    // Resize the image to a smaller size (adjust as needed)
    const resizedImage = originalImage.clone().resize(300, 200);

    // Create a blank image for the puzzle
    const puzzleImage = new Jimp(300, 200, 0xFFFFFFFF);

    // Divide the image into a grid and shuffle the pieces
    const gridSize = 3;
    const pieceWidth = resizedImage.getWidth() / gridSize;
    const pieceHeight = resizedImage.getHeight() / gridSize;

    const pieces = [];
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const piece = resizedImage.clone().crop(x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight);
            pieces.push(piece);
        }
    }

    // Shuffle the pieces
    pieces.sort(() => Math.random() - 0.5);

    // Paste the shuffled pieces onto the puzzle image
    let currentX = 0;
    let currentY = 0;

    for (const piece of pieces) {
