const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.list = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) return res.status(403).json({ message: 'Forbidden' });
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    // only admin or owner
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) return res.status(403).json({ message: 'Forbidden' });
    const payload = { ...req.body };
    // prevent changing password directly here; handle separately
    if (payload.password) delete payload.password;
    const user = await User.findByIdAndUpdate(id, payload, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) return res.status(403).json({ message: 'Forbidden' });
    const { password } = req.body;
    if (!password) return res.status(400).json({ message: 'Password required' });
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashed });
    res.json({ message: 'Password updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
