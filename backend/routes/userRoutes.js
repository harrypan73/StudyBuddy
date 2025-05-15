const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { pool, getUserById } = require('../models/User');

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

// GET 
router.get('/search', authMiddleware, async (req, res) => {
    const searchQuery = req.query.username;
    const currentUserId = req.user.id;

    if (!searchQuery || searchQuery.trim() === '') {
        return res.status(400).json({ message: 'Search query cannot be empty' });
    };

    try {
        const query = `
            SELECT id, username, profile_image
            FROM users
            WHERE username ILIKE $1 AND id != $2
            LIMIT 10
        `;
        const values = [`%${searchQuery}%`, currentUserId];
        const { rows } = await pool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;