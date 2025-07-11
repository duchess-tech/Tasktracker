require('dotenv').config({ quiet: true }); // suppress logs

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const historyRoutes = require('./routes/historyRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/history', historyRoutes);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('❌ MONGO_URI missing in .env');
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB connected');
        app.listen(5000, () => console.log('🚀 Server running on port 5000'));
    })
    .catch(err => console.error('❌ MongoDB connection failed:', err));
