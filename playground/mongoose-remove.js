const {
    ObjectID
} = require('mongodb');

const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');
const {
    User
} = require('./../server/models/user');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}, {
    _id: new ObjectID(),
    text: 'Third test todo'
}];
// Todo.insertMany(todos);

// Delete all records
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndremove
// Todo findByIdAndremove
Todo.findByIdAndRemove('5a3cf16a2ed2ac25c85ff269')
    .then((todo) => {
        console.log(todo);
    });

Todo.findOneAndRemove({
        text: 'Second test todo'
    })
    .then((todo) => {
        console.log(todo);
    });