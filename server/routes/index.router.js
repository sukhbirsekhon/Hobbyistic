const express = require('express');
const router = express.Router();
const auth = require('../routes/auth');
const userController = require('../controllers/user.controller');
const hobbyController = require('../controllers/hobby.controller');
const widgetsController = require('../controllers/widgets.controller')
//user
router.post('/register', userController.register);
router.post('/login', userController.login);

//hobby
router.post('/hobby', auth.required, hobbyController.addHobby);
router.get('/hobby', auth.required, hobbyController.getHobbies);
router.get('/hobby/:hobbyId', auth.required, hobbyController.getSingleHobby);
router.delete('/hobby/:hobbyId', auth.required, hobbyController.deleteHobby);
router.put('/hobby/:hobbyId', auth.required, hobbyController.updateHobby);

//widgets
router.get('/hobby/:hobbyId/widgets', auth.required, widgetsController.getWigets);

///task widget
router.get('/hobby/:hobbyId/widgets/tasks', auth.required, widgetsController.getTaskWidget);
router.post('/hobby/:hobbyId/widgets/tasks', auth.required, widgetsController.addTask);
router.put('/hobby/:hobbyId/widgets/tasks/:taskId', auth.required, widgetsController.updateTask);
router.delete('/hobby/:hobbyId/widgets/tasks/:taskId', auth.required, widgetsController.deleteTask);

//notes
router.put('/hobby/:hobbyId/widgets/notes', auth.required, widgetsController.updateNotes);


module.exports = router;