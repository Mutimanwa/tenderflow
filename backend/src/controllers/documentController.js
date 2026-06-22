const Document = require('../models/Document');

exports.list = async (req, res) => {
  try {
    const docs = await Document.find({ owner: req.user ? req.user._id : undefined });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.upload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const doc = new Document({ filename: req.file.filename, originalName: req.file.originalname, owner: req.user ? req.user._id : undefined });
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
