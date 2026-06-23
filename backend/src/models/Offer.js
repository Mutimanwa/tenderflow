const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
  launch: { type: Date },
  deadline: { type: Date },
  attribution: { type: Date },
}, { _id: false });

const OfferSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  budget: { type: String },
  contractType: { type: String },
  entity: { type: String },
  supportEmail: { type: String },
  // legacy single deadline kept for compatibility; timeline provides structured dates
  deadline: { type: Date },
  timeline: { type: TimelineSchema, default: {} },
  // documents attached to the offer
  docs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  status: { type: String, enum: ['open', 'inProgress', 'accepted', 'closed'], default: 'open' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Offer', OfferSchema);
