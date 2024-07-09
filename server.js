const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/submit-feedback', (req, res) => {
    const { name, email, feedback } = req.body;

    // Save feedback to a file (you can also use a database)
    const feedbackData = `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}\n\n`;
    fs.appendFile('feedback.txt', feedbackData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Feedback submitted successfully' });
    });
});

app.use(express.static('.'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
