const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'SIT753 DevOps Pipeline Application',
        status: 'running'
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy'
    });
});

app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ];

    res.json(users);
});

module.exports = app;