const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const auth = require('../middleware/auth');

router.get('/', offerController.list);
router.get('/:id', offerController.get);
router.post('/', auth, offerController.create);
router.put('/:id', auth, offerController.update);
router.delete('/:id', auth, offerController.remove);

module.exports = router;
