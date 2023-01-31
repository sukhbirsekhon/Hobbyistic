const mongoose = require('mongoose');
const User = mongoose.model('User');
const Hobby = mongoose.model('Hobby');
const Widgets = mongoose.model('Widgets');
const passport = require('passport');
const auth = require('../routes/auth')
const widgetService = require('../services/widgets.service')

module.exports.getWigets = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        Widgets.findOne({user: req.auth.id, hobby: req.params.hobbyId}, (err, widgets) => {
            if (err) {
                return next(err);
            }
            if (!widgets) {
                return res.status(404).json({errors: {widget: "Widget not found"}});
            }
            return res.json(widgets.toJSON());
        });
    });
}

module.exports.getTaskWidget = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        Widgets.findOne({ user: req.auth.id, hobby: req.params.hobbyId }).select('taskWidget').then(function(taskWidget) {
            if (!taskWidget) {
                return res.status(404).json({errors: {taskWidget: "Not Found"}});
            }
            return res.json(taskWidget.toJSON());
        }).catch(next);        
    });
}

module.exports.addTask = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        const newTask = { task: req.body.task, completed: req.body.completed };
        Widgets.findOneAndUpdate(
            { user: req.auth.id, hobby: req.params.hobbyId }, 
            { $push: { 'taskWidget.tasks': newTask } }, 
            { new: true },
            (err, widget) => {
                if (err) {
                    return next(err);
                }
                if (!widget) {
                    return res.status(404).json({errors: {widget: "Widget not found"}});
                }
                res.send(widget.toJSON());
            }
        );
    });
}

module.exports.updateTask = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        const updatedTask = { task: req.body.task, completed: req.body.completed };
        Widgets.findOneAndUpdate(
            { user: req.auth.id, hobby: req.params.hobbyId, "taskWidget.tasks._id": req.params.taskId }, 
            { $set: { 'taskWidget.tasks.$': updatedTask } }, 
            { new: true },
            (err, widget) => {
                if (err) {
                    return next(err);
                }
                if (!widget) {
                    return res.status(404).json({errors: {widget: "Widget not found"}});
                }
                res.send(widget.toJSON());
            }
        );
    });
}

module.exports.deleteTask = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        Widgets.findOneAndUpdate(
            { user: req.auth.id, hobby: req.params.hobbyId }, 
            { $pull: { 'taskWidget.tasks': { _id: req.params.taskId } } }, 
            { new: true },
            (err, widget) => {
                if (err) {
                    return next(err);
                }
                if (!widget) {
                    return res.status(404).json({errors: {widget: "Widget not found"}});
                }
                res.send(widget.toJSON());
            }
        );
    });
}

module.exports.updateNotes = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        Widgets.findOneAndUpdate({ user: req.auth.id, hobby: req.params.hobbyId }, 
            { $set: { 'notesWidget.note': req.body.note } }, 
            { new: true },
            (err, widget) => {
                if (err) {
                    return next(err);
                }
                if (!widget) {
                    return res.status(404).json({errors: {widget: "Widget not found"}});
                }
                res.send(widget.toJSON());
        });        
    });
}

module.exports.getExternalLinksWithQuery = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        let query = req.query.query;
        if ((query != null &&  query != '')) {
            return widgetService.getExternalLinks(query).then((externalLinks) => {
                Widgets.findOneAndUpdate({user: req.auth.id, hobby: req.params.hobbyId}, { $set: { 'externalLinksWidget.links': externalLinks }}, {new: true}, (err, updatedWidget) => {
                    if (err) {
                        return next(err);
                    } else {
                        return res.json(updatedWidget);
                    }
                });
            });
        } else {
            Widgets.findOne({user: req.auth.id, hobby: req.params.hobbyId}, (err, widgets) => {
                if (err) {
                    return next(err);
                }
                if (!widgets) {
                    return res.status(404).json({errors: {widget: "Widget not found"}});
                }
                return res.json(widgets.toJSON());
            }); 
        }       
    });
}

module.exports.addEvent = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        console.log('yeah it tried to get here')
        const newEvent = req.body;
        console.log(req.body)
        Widgets.findOneAndUpdate(
            { user: req.auth.id, hobby: req.params.hobbyId }, 
            { $push: { 'calendarWidget.events': newEvent } }, 
            { new: true },
            (err, widget) => {
                if (err) {
                    return next(err);
                }
                if (!widget) {
                    return res.status(404).json({errors: {widget: "Widget not found"}});
                }
                res.send(widget.toJSON());
            }
        );
    });
}

