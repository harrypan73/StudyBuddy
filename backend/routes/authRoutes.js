const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { createUser, getUserByEmail } = require('../models/User');

const router = express.Router();

// Sign up
router.post('/signup', [
    check('username', 'Please enter a username').custom(value => value.trim()).not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    console.log("Attempting to sign up user with email: ", req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Error: ", errors.errors[0].msg);
        return res.status(400).json({ message: errors.errors[0].msg });
    }

    const { username, email, password } = req.body;
    try {
        let existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists' });
        }

        const newUser = await createUser(username, email, password);
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);

        res.json({ token, user: { id: newUser.id, username: newUser.username, email: newUser.email } });
        console.log("User signed up successfully");
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Log in
router.post('/login', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password').not().isEmpty()
], async (req, res) => {
    console.log("Attempting to log into user with email: ", req.body.email);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Error: ", errors.errors[0].msg);
        return res.status(400).json({ message: errors.errors[0].msg });
    }

    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Unregistered email' });
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token, user: {id: user.id, username: user.username, email: user.email } });
        console.log("User logged in successfully");
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;