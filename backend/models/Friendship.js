const mongoose = require('mongoose');

const FriendshipSchema = new mongoose.Schema({
    requesterId: { type: Number, required: true },
    recipientId: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Friendship', FriendshipSchema);