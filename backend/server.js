const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Routes
const authRoutes = require('./routes/authRoutes');
const studySessionRoutes = require('./routes/studySessionRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('StudyBuddy API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Connect routes
app.use('/api/auth', authRoutes);
app.use('/api/study-sessions', studySessionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));