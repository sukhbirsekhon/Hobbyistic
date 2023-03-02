const mongoose = require('mongoose');
const User = mongoose.model('User');
const Hobby = mongoose.model('Hobby');
const Widgets = mongoose.model('Widgets');
const Post = mongoose.model('Posts');
const widgetService = require('../services/widgets.service')
const { GridFSBucket } = require('mongodb');
const concat = require('concat-stream');


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
        const newEvent = req.body;
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


module.exports.updateEvent = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        /*
        //prevent body from being updated, this should be used for other methods in the future,
        //issue is if user does not pass all attributes for body on update it will be overwritter, or maybe thats not a bad thing
        //depending on how the user wants to interact without API.
        //const updatedEvent = Object.assign({}, widget.calendarWidget.events.find(event => event._id.toString() === req.params.eventId), req.body);
        const updatedEvent = {};
        Object.keys(req.body).forEach(key => {
            updatedEvent[`calendarWidget.events.$.${key}`] = req.body[key];
        });
        updatedEvent = req.body;
        console.log("was called");
        console.log(req.body)
        console.log(req.params.eventId)
        */
        Widgets.findOneAndUpdate(
            { user: req.auth.id, hobby: req.params.hobbyId, "calendarWidget.events._id": req.params.eventId }, 
            { $set: { 'calendarWidget.events.$': updatedEvent } }, 
            { new: true },
            (err, widget) => {
                if (err) {
                    return next(err);
                }
                if (!widget) {
                    return res.status(404).json({errors: {widget: "Widget not found"}});
                }
                console.log(widget);
                res.send(widget.toJSON());
            }
        );
    });
}

module.exports.deleteEvent = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
        Widgets.findOneAndUpdate(
            { user: req.auth.id, hobby: req.params.hobbyId }, 
            { $pull: { 'calendarWidget.events': { _id: req.params.eventId }}}, 
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

module.exports.getSingleMotivationPost = (req, res, next) => {
    if (req.auth == null) {
      return res.status(401).json({errors: {user: "Unauthorized"}});
    }
    User.findById(req.auth.id).then(function(user) {
      if (!user) {
        return res.status(401).json({ errors: { user: 'Unauthorized' } });
      }
        Post.findOne({user: req.auth.id, hobby: req.params.hobbyId, _id: req.params.postId})
          .populate({ path: 'user hobby', select: '-password -saltSecret -email' })
          .then(function(post) {
            if (!post || post.length === 0) {
              return res.status(404).json({ errors: { post: 'Post not found' } });
            }
            return res.send(post);
        });
    });
};

module.exports.addMotivationPost = (req, res, next) => {
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user){
        if (!user) { 
            return res.status(401).json({errors: {user: "Unauthorized"}}); 
        }
    Hobby.findOne({user: req.auth.id, hobby: req.params.hobbyId}, (err, hobby) => {
        if (err) {
            return next(err);
        }
        if (!hobby) {
            return res.status(404).json({errors: {hobby: "Hobby not found"}});
        }
        const post = new Post({
            user: req.auth.id,
            hobby: req.params.hobbyId,
            title: req.body.title,
            description: req.body.description,
            sharable: req.body.sharable,
            postDate: new Date(),
            image: req.file.id
        });
        post.save()
            .then(doc => {
                return Post.populate(doc, { path: 'user hobby', select: '-password -saltSecret -email' });
            })
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                next(err);
        });
    });
});
}

module.exports.getPostImage = (req, res, next) => {
const bucket = new GridFSBucket(mongoose.connection.db, {bucketName: 'photo'});
  if (req.auth == null) {
    return res.status(401).json({ errors: { user: 'Unauthorized' } });
  }
  User.findById(req.auth.id)
    .then(function (user) {
      if (!user) {
        return res.status(401).json({ errors: { user: 'Unauthorized' } });
      }
      Post.findOne({ user: req.auth.id, hobby: req.params.hobbyId,_id: req.params.postId , $or: [{sharable: true, _id: req.params.postId}]}).then(function(post) {
        if (!post) {
            return res.status(404).json({ errors: { post: 'Post not found' } });
        }
        bucket.openDownloadStream(post.image).pipe(concat((data) => {
            return res.send(data);
        }));
    });
    })
};

module.exports.getMotivationPosts = (req, res, next) => {
    if (req.auth == null) {
      return res.status(401).json({errors: {user: "Unauthorized"}});
    }
    User.findById(req.auth.id).then(function(user) {
      if (!user) {
        return res.status(401).json({ errors: { user: 'Unauthorized' } });
      }
      if (req.query.scope == "public") {
        Post.find({sharable: true})
          .populate({ path: 'user hobby', select: '-password -saltSecret -email' })
          .sort({ postDate: -1 })
          .then(function(posts) {
            if (!posts || posts.length === 0) {
              return res.status(404).json({ errors: { post: 'Post not found' } });
            }
            return res.send(posts);
          });
      } else {
        Post.find({user: req.auth.id, hobby: req.params.hobbyId})
          .populate({ path: 'user hobby', select: '-password -saltSecret -email' })
          .sort({ postDate: -1 })
          .then(function(posts) {
            if (!posts || posts.length === 0) {
              return res.status(404).json({ errors: { post: 'Post not found' } });
            }
            return res.send(posts);
          });
      }
    });
  };

module.exports.deleteMotivationPost = (req, res, next) => {
    const bucket = new GridFSBucket(mongoose.connection.db, {bucketName: 'photo'});
    if (req.auth == null) {
        return res.status(401).json({errors: {user: "Unauthorized"}}); 
    }
    User.findById(req.auth.id).then(function(user) {
        if (!user) {
            return res.status(401).json({ errors: { user: 'Unauthorized' } });
        }
        Post.findOne({user: req.auth.id, hobby: req.params.hobbyId, _id: req.params.postId}).then(function(post) {
            console.log(post)
            if (!post) {
                return res.status(404).json({ errors: { post: 'Post not found' } });
            }
            const imageId = post.image
            post.remove().then(function() {
                bucket.delete(imageId, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.json({ message: 'Post and image deleted' });
                });
            });
        });
    });
};
