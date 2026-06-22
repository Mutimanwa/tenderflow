const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/', auth, userController.list);
router.get('/:id', auth, userController.get);
router.put('/:id', auth, userController.update);
router.delete('/:id', auth, userController.remove);
router.put('/:id/password', auth, userController.changePassword);

module.exports = router;
