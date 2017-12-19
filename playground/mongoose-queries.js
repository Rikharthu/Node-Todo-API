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

var id = '5a390f7508934134f07209e0';

// Use ObjectID to check whether id is valid
if (!ObjectID.isValid(id)) {
    console.log(`Id ${id} is not valid!`);
}

// Query by id
// returns an array, even if only single item has been found
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id)
    .then((todo) => {
        console.log('Todo by id', todo);
    });


var fakeId = '6a390f7508934134f07209e0';
Todo.findById(fakeId)
    .then((todo) => {
        if (!todo) {
            return console.log('Id not found');
        }
        console.log('Todo by id', todo);
    });

var userId = '5a2eb145e020a51a780fe558';
User.findById(userId)
    .then((user) => {
        if (!user) {
            return console.log('Id not found');
        }
        console.log('User by id', user);
    });