const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    location: { type: String }, // Name of location
    coordinates: {              // Coordinates of location
        lat: { type: Number },
        lng: { type: Number }
    },
    subject: { type: String },
    buddies: [{ type: Number }], // Array of user IDs
    qualityRating: { type: Number, min: 1, max: 5 },
    notes: { type: String },     // User's notes about the session
    snapshotURL: { type: String } // URL of optional snapshot
}, { timestamps: true });

module.exports = mongoose.model('StudySession', StudySessionSchema);