const Document = require('../models/Document');

exports.list = async (req, res) => {
  try {
    if (req.user && req.user.role === 'admin') {
      const docs = await Document.find().populate('owner');
      return res.json(docs);
    }
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

exports.remove = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'admin' && doc.owner && doc.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../uploads', doc.filename);
    // remove file if exists
    try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
    await doc.remove();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
