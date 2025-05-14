const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserById } = require('../models/User');

// GET user profile image by user ID
router.get('/profile_image/:id', authMiddleware, async (req, res) => {
    console.log("Attempting to get profile image for user with id: ", req.params.id);
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ profile_image: user.profile_image });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});
