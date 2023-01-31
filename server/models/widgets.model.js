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
    calendarWidgetWidget: calendarWidgetSchema
 });

 const calendarWidgetSchema = new mongoose.Schema({
    events: [{
        title: {type: String, required: true},
        description: {type: String},
        startDate: {type: Date},
        endDate: {type: Date}
    }]
 })

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
        calendarWidget: this.calendarWidget
    };
};

widgetsSchema.methods.toJSONForTasks = function() {
    return {
        taskWidget: this.taskWidget,
    };
};

//mongoose.model('TaskWidget', taskWidgetSchema);
//mongoose.model('NotesWidget', notesWidgetSchema);
 mongoose.model('Widgets', widgetsSchema);

  