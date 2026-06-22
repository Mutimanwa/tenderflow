const Submission = require('../models/Submission');

exports.listByOffer = async (req, res) => {
  try {
    const submissions = await Submission.find({ offer: req.params.offerId }).populate('user');
    res.json(submissions);
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
