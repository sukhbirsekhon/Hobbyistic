const express = require('express');
const router = express.Router();
const auth = require('../routes/auth');
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/testauth', auth.required, userController.testauth);

module.exports = router;