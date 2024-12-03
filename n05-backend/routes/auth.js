const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body; 

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' }); 
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' }); 
        }

        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: '1h', 
        });

        res.json({ token }); 
    });
});

module.exports = router;
