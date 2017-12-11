var mongoose = require('mongoose');

// Configure mongoose promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});

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
    }
});
// More info:
// http://mongoosejs.com/docs/validation.html

var newTodo = new Todo({
    text: 'Cook dinner'
});

// .save() returns a promise
newTodo.save()
    .then((doc) => {
        console.log('Saved todo', doc);
    }, (e) => {
        console.error('Unable to save todo', e);
    });

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        // custom validation
        validate: {
            validator: function (v) {
                // email regex
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    }
})

var newUser = new User({
    email: "VasjaDominator@mail.ru"
})

newUser.save()
    .then((doc) => {
        console.log('Saved user', doc);
    }, (e) => {
        console.error('Unable to save todo', e);
    });