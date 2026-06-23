const Offer = require('../models/Offer');

function formatDateShort(date) {
  try {
    return date ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date)) : null;
  } catch (e) {
    return null;
  }
}

exports.list = async (req, res) => {
  try {
    const offers = await Offer.find().populate('docs').sort({ createdAt: -1 });
    // add formatted timeline for convenience
    const shaped = offers.map(o => {
      const obj = o.toObject({ getters: true });
      obj.timelineFormatted = {
        launch: formatDateShort(obj.timeline?.launch || obj.createdAt),
        deadline: formatDateShort(obj.timeline?.deadline || obj.deadline),
        attribution: formatDateShort(obj.timeline?.attribution),
      };
      return obj;
    });
    res.json(shaped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.get = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate('docs');
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    const obj = offer.toObject({ getters: true });
    obj.timelineFormatted = {
      launch: formatDateShort(obj.timeline?.launch || obj.createdAt),
      deadline: formatDateShort(obj.timeline?.deadline || obj.deadline),
      attribution: formatDateShort(obj.timeline?.attribution),
    };
    res.json(obj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.create = async (req, res) => {
  try {
    const data = req.body;
    if (req.user) data.createdBy = req.user._id;
    const offer = new Offer(data);
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.update = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.remove = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
