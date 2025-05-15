const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Friendship = require('../models/Friendship');
const { getUserById } = require('../models/User');

// Send a friend request
router.post('/send', authMiddleware, async (req, res) => {
    const { recipientId } = req.body;
    const requesterId = req.user.id;
    try {
        const existingRequest = await Friendship.findOne({
            $or: [
                { requesterId, recipientId },
                { recipientId, requesterId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already exists' });
        }

        const newFriendship = await Friendship.create({
            requesterId,
            recipientId,
            status: 'pending'
        });

        res.status(201).json({ message: 'Friend request sent', newFriendship });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Accept friend request
router.post('/accept', authMiddleware, async (req, res) => {
    const { requesterId } = req.body;
    const recipientId = req.user.id;
    try {
        const friendship = await Friendship.findOneAndUpdate(
            { requesterId, recipientId, status: 'pending' },
            { status: 'accepted' },
            { new: true }
        );

        if (!friendship) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        res.json({ message: 'Friend request accepted', friendship });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reject friend request
router.post('/reject', authMiddleware, async (req, res) => {
    const { requesterId } = req.body;
    const recipientId = req.user.id;
    try {
        const friendship = await Friendship.findOneAndDelete(
            { requesterId, recipientId, status: 'pending' }
        );

        if (!friendship) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        res.json({ message: 'Friend request rejected', friendship });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get list of friends
router.get('/friends', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const friendships = await Friendship.find({
            $or: [
                { requesterId: userId, status: 'accepted' },
                { recipientId: userId, status: 'accepted' }
            ]
        });

        const friendIds = friendships.map(friendship => {
            return friendship.requesterId === userId ? friendship.recipientId : friendship.requesterId;
        });

        const friends = await Promise.all(friendIds.map(id => getUserById(id)));

        res.json(friends);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get list of friend requests
router.get('/requests', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const requests = await Friendship.find({
            recipientId: userId,
            status: 'pending'
        });

        const requesterIds = requests.map(request => request.requesterId);

        const requesters = await Promise.all(requesterIds.map(id => getUserById(id)));

        res.json(requesters);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;