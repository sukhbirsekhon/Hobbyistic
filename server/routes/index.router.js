const express = require('express');
const router = express.Router();
const auth = require('../routes/auth');
const userController = require('../controllers/user.controller');
const hobbyController = require('../controllers/hobby.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/testauth', auth.required, userController.testauth);
router.post('/hobby', auth.required, hobbyController.addHobby);
router.get('/hobby', auth.required, hobbyController.getHobbies);
router.get('/hobby/:hobbyId', auth.required, hobbyController.getSingleHobby);
router.delete('/hobby/:hobbyId', auth.required, hobbyController.deleteHobby);
router.put('/hobby/:hobbyId', auth.required, hobbyController.updateHobby);

module.exports = router;