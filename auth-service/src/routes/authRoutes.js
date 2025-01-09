const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Înregistrare utilizator
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).send('All fields are required');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
});

// Autentificare utilizator
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});

// Validare token
router.post('/validate', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).send('Token is required');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json(decoded);
    } catch (err) {
        res.status(401).send('Invalid or expired token');
    }
});

module.exports = router;
