var mongoose = require('mongoose');

// Create a mongoose data model so the mongoose knows how to save data
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true, // add validator, stating that this field is required
        minLength: 1,
        trim: true // remove any leading or trailing whitespaces
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});
// More info:
// http://mongoosejs.com/docs/validation.html

module.exports = {
    Todo
};