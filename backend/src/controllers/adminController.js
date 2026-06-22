const User = require('../models/User');
const Offer = require('../models/Offer');
const Submission = require('../models/Submission');
const Document = require('../models/Document');

exports.stats = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const [usersCount, offersCount, submissionsCount, documentsCount] = await Promise.all([
      User.countDocuments(), Offer.countDocuments(), Submission.countDocuments(), Document.countDocuments()
    ]);
    const recentOffers = await Offer.find().sort({ createdAt: -1 }).limit(5).select('title createdAt status');
    res.json({ usersCount, offersCount, submissionsCount, documentsCount, recentOffers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
