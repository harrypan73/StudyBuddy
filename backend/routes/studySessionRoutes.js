const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const StudySession = require('../models/StudySession');

// CREATE a new study session
router.post('/new', authMiddleware, async (req, res) => {
    console.log("Attempting to create a new study session: ", req.body);
    console.log("User details: ", req.user);
    try {
        const session = new StudySession({
            userId: req.user.id,
            username: req.user.username,
            ...req.body
        });
        await session.save();
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// UPDATE a study session
router.put('/:id', authMiddleware, async (req, res) => {
    console.log("Attempting to update study session with id: ", req.params.id);
    try {
        const session = await StudySession.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.json(session);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE a study session
router.delete('/:id', authMiddleware, async (req, res) => {
    console.log("Attempting to delete study session with id: ", req.params.id);
    try {
        const session = await StudySession.findOneAndDelete(
            { _id: req.params.id, userId: req.user.id }
        );
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        res.json({ message: 'Session deleted', session });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET all study sessions for logged in user
router.get('/allUser', authMiddleware, async (req, res) => {
    console.log("Attempting to get all study sessions for user with id: ", req.user.id);
    try {
        const sessions = await StudySession.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET current active study session for logged in user
router.get('/active', authMiddleware, async (req, res) => {
    console.log("Attempting to get active study session for user with id: ", req.user.id);
    try {
        const activeSession = await StudySession.findOne(
            { userId: req.user.id, endTime: null },
        );
        res.json(activeSession || null);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET all study sessions in database
router.get('/all', authMiddleware, async (req, res) => {
    console.log("Attempting to get all study sessions in database");
    try {
        const sessions = await StudySession.find({
            $nor: [
                { userId: req.user.id, endTime: null}
            ]
        }).sort([
            ['isActive', -1],
            ['endTime', -1],
            ['startTime', -1]
        ]);
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;