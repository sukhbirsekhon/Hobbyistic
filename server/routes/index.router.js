const express = require('express');
const router = express.Router();
const auth = require('../routes/auth');
const userController = require('../controllers/user.controller');
const hobbyController = require('../controllers/hobby.controller');
const widgetsController = require('../controllers/widgets.controller')
const { gridStorage } = require('../models/db')




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
router.get('/hobby/:hobbyId/widgets/tasks/:taskId', auth.required, widgetsController.getSingleTask);
router.post('/hobby/:hobbyId/widgets/tasks', auth.required, widgetsController.addTask);
router.put('/hobby/:hobbyId/widgets/tasks/:taskId', auth.required, widgetsController.updateTask);
router.delete('/hobby/:hobbyId/widgets/tasks/:taskId', auth.required, widgetsController.deleteTask);

//notes
router.put('/hobby/:hobbyId/widgets/notes', auth.required, widgetsController.updateNotes);

//external links
router.get('/hobby/:hobbyId/widgets/externallinks', auth.required, widgetsController.getExternalLinksWithQuery);

//calendar
router.post('/hobby/:hobbyId/widgets/calendar/events', auth.required, widgetsController.addEvent);
router.put('/hobby/:hobbyId/widgets/calendar/events/:eventId', auth.required, widgetsController.updateEvent);
router.delete('/hobby/:hobbyId/widgets/calendar/events/:eventId', auth.required, widgetsController.deleteEvent);

//motivation
router.post('/hobby/:hobbyId/widgets/motivation/post',  auth.required, gridStorage.single('photo'), widgetsController.addMotivationPost);
router.delete('/hobby/:hobbyId/widgets/motivation/post/:postId',  auth.required, widgetsController.deleteMotivationPost);
router.get('/hobby/:hobbyId/widgets/motivation/post',  auth.required, widgetsController.getMotivationPosts);
router.get('/hobby/:hobbyId/widgets/motivation/post/:postId/image',  auth.required, widgetsController.getPostImage);
router.get('/hobby/:hobbyId/widgets/motivation/post/:postId',  auth.required, widgetsController.getSingleMotivationPost);

//assistant
router.get('/hobby/:hobbyId/widgets/assistant',  auth.required, widgetsController.getChatMessage);

module.exports = router;