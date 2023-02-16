const mongoose = require('mongoose');

const externalLinksWidgetSchema = new mongoose.Schema({
    links: [{
        title: { type: String, required: false },
        link: { type: String, required: true },
        snippet: { type: String, required: false }
    }]
});

const taskWidgetSchema = new mongoose.Schema({
    tasks: [{
        task: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }]
});
  
const notesWidgetSchema = new mongoose.Schema({
    note: {type: String, required: true}
});

const calendarWidgetSchema = new mongoose.Schema({
    events: [{
        title: {type: String, required: true},
        description: {type: String},
        startDate: {type: Date},
        endDate: {type: Date},
        frequency: {type: String}
    }]
 })

const motivationWidgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Must be associated with a user'
    },
    hobby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hobby',
        required: 'Must be associated with a hobby',
        unique: true
    },
    title: {type: String, required: true},
    description: {type: String},
    sharable: {type: Boolean, default: false},
    postDate: {type: Date, required: true},
    image: {type: mongoose.Schema.Types.ObjectId, ref: 'photo.files'}
 })

 const photoSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    length: Number,
    uploadDate: Date,
    metadata: Object
  });


const widgetsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Must be associated with a user'
    },
    hobby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hobby',
        required: 'Must be associated with a hobby',
        unique: true
    },
    taskWidget: taskWidgetSchema,
    notesWidget: notesWidgetSchema,
    externalLinksWidget: externalLinksWidgetSchema,
    calendarWidget: calendarWidgetSchema,
    //motivationWidget: [{type: mongoose.Schema.Types.ObjectId, ref: 'Posts'}]
 });

 const Widgets = mongoose.model('Widgets', widgetsSchema);

 widgetsSchema.pre('save', function(next) {
    Widgets.findOne({ hobby: this.hobby }, (err, widget) => {
        if (widget) {
            next(new Error('Widgets already exist for this hobby, how did this even happen?'));
        }
        next();
    });
});

widgetsSchema.methods.toJSON = function() {
    return {
        user: this.user,
        hobby: this.hobby,
        taskWidget: this.taskWidget,
        notesWidget: this.notesWidget,
        externalLinksWidget: this.externalLinksWidget,
        calendarWidget: this.calendarWidget,
        motivationWidget: this.postSchema
    };
};

widgetsSchema.methods.toJSONForTasks = function() {
    return {
        taskWidget: this.taskWidget,
    };
};

mongoose.model('TaskWidget', taskWidgetSchema);
mongoose.model('NotesWidget', notesWidgetSchema);
mongoose.model('Widgets', widgetsSchema);
mongoose.model('Posts', motivationWidgetSchema);
mongoose.model('photo.files', photoSchema);
  