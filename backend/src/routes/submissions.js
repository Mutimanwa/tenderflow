const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const auth = require('../middleware/auth');

router.get('/offer/:offerId', auth, submissionController.listByOffer);
router.get('/', auth, submissionController.listAll);
router.post('/', auth, submissionController.create);
router.get('/:id', auth, submissionController.get);
router.put('/:id', auth, submissionController.update);
router.delete('/:id', auth, submissionController.remove);

module.exports = router;
