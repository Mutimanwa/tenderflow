const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middleware/auth');

router.get('/offer/:offerId', auth, submissionController.listByOffer);
router.post('/', auth, submissionController.create);
router.get('/:id', auth, submissionController.get);

module.exports = router;
