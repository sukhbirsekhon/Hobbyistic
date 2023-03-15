const { check, param, validationResult, body } = require('express-validator');
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
router.get('/hobby/:hobbyId', [auth.required, param('hobbyId').isMongoId()], hobbyController.getSingleHobby);
router.delete('/hobby/:hobbyId', [auth.required, param('hobbyId').isMongoId()], auth.required, hobbyController.deleteHobby);
router.put('/hobby/:hobbyId', [auth.required, param('hobbyId').isMongoId()], hobbyController.updateHobby);

//widgets
router.get('/hobby/:hobbyId/widgets', auth.required, widgetsController.getWigets);

///task widget
router.get('/hobby/:hobbyId/widgets/tasks', [auth.required, param('hobbyId').isMongoId()], widgetsController.getTaskWidget);
router.get('/hobby/:hobbyId/widgets/tasks/:taskId', [auth.required, param('hobbyId').isMongoId(), param('taskId').isMongoId()], widgetsController.getSingleTask);
router.post('/hobby/:hobbyId/widgets/tasks', [auth.required, param('hobbyId').isMongoId()], widgetsController.addTask);
router.put('/hobby/:hobbyId/widgets/tasks/:taskId', [auth.required, param('hobbyId').isMongoId(), param('taskId').isMongoId()], widgetsController.updateTask);
router.delete('/hobby/:hobbyId/widgets/tasks/:taskId', [auth.required, param('hobbyId').isMongoId(), param('taskId').isMongoId()], widgetsController.deleteTask);

//notes
router.put('/hobby/:hobbyId/widgets/notes', [auth.required, param('hobbyId').isMongoId()], widgetsController.updateNotes);

//external links
router.get('/hobby/:hobbyId/widgets/externallinks', [auth.required, param('hobbyId').isMongoId()], widgetsController.getExternalLinksWithQuery);

//calendar
router.post('/hobby/:hobbyId/widgets/calendar/events', [auth.required, param('hobbyId').isMongoId()], widgetsController.addEvent);
router.put('/hobby/:hobbyId/widgets/calendar/events/:eventId', [auth.required, param('hobbyId').isMongoId(), param('eventId').isMongoId()], widgetsController.updateEvent);
router.delete('/hobby/:hobbyId/widgets/calendar/events/:eventId', [auth.required, param('hobbyId').isMongoId(), param('eventId').isMongoId()], widgetsController.deleteEvent);

//motivation
router.post('/hobby/:hobbyId/widgets/motivation/post',  auth.required, gridStorage.single('photo'),
    [
        body('photo').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('there gotta be a file');
            }
            if (!req.file.mimetype.startsWith('image')) {
                throw new Error('that was not an image file');
            }
            if (req.file.size > 5000000) { 
                throw new Error('size too large');
            }
            return true;
        }), param('hobbyId').isMongoId()
    ],
    widgetsController.addMotivationPost
);
router.delete('/hobby/:hobbyId/widgets/motivation/post/:postId', [auth.required, param('hobbyId').isMongoId(), param('postId').isMongoId()], widgetsController.deleteMotivationPost);
router.get('/hobby/:hobbyId/widgets/motivation/post', [auth.required, param('hobbyId').isMongoId()], widgetsController.getMotivationPosts);
router.get('/hobby/:hobbyId/widgets/motivation/post/:postId/image', [auth.required, param('hobbyId').isMongoId(), param('postId').isMongoId()], widgetsController.getPostImage);
router.get('/hobby/:hobbyId/widgets/motivation/post/:postId', [auth.required, param('hobbyId').isMongoId(), param('postId').isMongoId()], widgetsController.getSingleMotivationPost);

//assistant
router.get('/hobby/:hobbyId/widgets/assistant', [auth.required, param('hobbyId').isMongoId()], widgetsController.getChatMessage);

module.exports = router;