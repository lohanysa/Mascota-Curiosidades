// models/SavedImage.js
const mongoose = require('mongoose');

const SavedImageSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  breed: { type: String, required: true },
  type: { type: String, enum: ['cat', 'dog'], required: true },
  savedAt: { type: Date, default: Date.now },
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('SavedImage', SavedImageSchema);
