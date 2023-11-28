const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    // Implement image processing logic and puzzle generation here
    // For simplicity, let's just send back a sample link
    const puzzleLink = 'https://example.com/puzzle?token=abc123';
    res.json({ link: puzzleLink });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
