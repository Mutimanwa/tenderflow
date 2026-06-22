const Submission = require('../models/Submission');

exports.listByOffer = async (req, res) => {
  try {
    const submissions = await Submission.find({ offer: req.params.offerId }).populate('user');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.listAll = async (req, res) => {
  try {
    // Admins can see all submissions; suppliers see only their own
    if (req.user && req.user.role === 'admin') {
      const subs = await Submission.find().populate('user').populate('offer');
      return res.json(subs);
    }
    if (req.user) {
      const subs = await Submission.find({ user: req.user._id }).populate('offer');
      return res.json(subs);
    }
    res.status(401).json({ message: 'Unauthorized' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.user) data.user = req.user._id;
    const submission = new Submission(data);
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate('user').populate('offer');
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    // allow deletion by admin or owner
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'admin' && submission.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await submission.remove();
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
