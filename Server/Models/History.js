// server/models/History.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ['started', 'suspended', 'completed'], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
