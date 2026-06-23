const Document = require('../models/Document');

exports.list = async (req, res) => {
  try {
    if (req.user && req.user.role === 'admin') {
    let query = {};
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'admin') query.owner = req.user._id;

    // populate owner so frontend can show owner name/email
    const docs = await Document.find(query).sort({ createdAt: -1 }).populate('owner', 'name email');

    const mapped = docs.map((d) => ({
      _id: d._id,
      filename: d.filename,
      originalName: d.originalName,
      size: d.size,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      owner: d.owner ? d.owner._id : undefined,
      ownerName: d.owner ? (d.owner.name || d.owner.email) : undefined,
    }));

    res.json(mapped);
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
    const doc = new Document({
      filename: req.file.filename,
      originalName: req.file.originalname,
      owner: req.user ? req.user._id : null,
      size: req.file.size,
    });
    await doc.save();

    // populate owner for response
    await doc.populate('owner', 'name email').execPopulate();

    res.json({
      _id: doc._id,
      filename: doc.filename,
      originalName: doc.originalName,
      size: doc.size,
      createdAt: doc.createdAt,
      owner: doc.owner ? doc.owner._id : undefined,
      ownerName: doc.owner ? (doc.owner.name || doc.owner.email) : undefined,
    });
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
