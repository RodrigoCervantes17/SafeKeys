const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  appId: String,
  value: String, // encrypted
  environment: { type: String, enum: ['development', 'staging', 'production'] },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  tags: [String]
});

module.exports = mongoose.model('Key', keySchema);
