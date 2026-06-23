const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  size: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Document', DocumentSchema);
