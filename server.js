const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for user progress
let userProgress = {
    tasksCompleted: 0,
    points: 0,
};

// Root route to serve a basic homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Mental Health Zen Garden!</h1><p>Use the frontend to complete tasks and grow your garden.</p>');
});

// Progress route
app.get('/progress', (req, res) => {
    res.json(userProgress);
});

// Complete task route
app.post('/complete-task', (req, res) => {
    const { task } = req.body;

    // Validate task type
    const validTasks = ['meditation', 'exercise', 'journaling'];
    if (!validTasks.includes(task)) {
        return res.status(400).json({ error: 'Invalid task type.' });
    }

    // Award points based on task type
    let pointsAwarded = 0;
    if (task === 'meditation') {
        pointsAwarded = 1;
    } else if (task === 'exercise') {
        pointsAwarded = 2;
    } else if (task === 'journaling') {
        pointsAwarded = 1;
    }

    // Update user progress
    userProgress.tasksCompleted += 1;
    userProgress.points += pointsAwarded;

    // Respond with updated progress
    res.json(userProgress);
});

// Reset progress route
app.post('/reset-progress', (req, res) => {
    userProgress.tasksCompleted = 0;
    userProgress.points = 0;

    // Respond with the reset progress
    res.json(userProgress);
});

// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
