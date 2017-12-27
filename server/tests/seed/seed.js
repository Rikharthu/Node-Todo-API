const jwt = require('jsonwebtoken');
const {
    ObjectID
} = require('mongodb');
const {
    Todo
} = require('./../../models/todo');
const {
    User
} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'andrew@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
                _id: userOneId,
                access: 'auth'
            },
            'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'jen@example.com',
    password: 'userTwoPass'
}]

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}, {
    _id: new ObjectID(),
    text: 'Third test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos);
        }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({})
        .then(() => {
            // these are promises
            var userOne = new User(users[0]).save();
            var userTwo = new User(users[1]).save();
            // this will fire once all of these promises resolve
            return Promise.all([userOne, userTwo]);
        }).then(() => done());
};

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
};