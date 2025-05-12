const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    username: { type: String, required: true }, // Name of user
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    isActive: { type: Boolean, default: true }, // Indicates if the session is active
    location: { type: String }, // Name of location
    coordinates: {              // Coordinates of location
        lat: { type: Number },
        lng: { type: Number }
    },
    subject: { type: String, required: true },
    buddies: [{ type: Number }], // Array of user IDs
    qualityRating: { type: Number, min: 1, max: 5 },
    notes: { type: String },     // User's notes about the session
    snapshotURL: { type: String } // URL of optional snapshot
}, { timestamps: true });

// Index for fast lookup of active study sessions by user ID
StudySessionSchema.index({ userId: 1, endTime: 1 });

module.exports = mongoose.model('StudySession', StudySessionSchema);