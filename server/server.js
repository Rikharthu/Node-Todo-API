var env = process.env.NODE_ENV; // provided by heroky environment variables or our custom configurations (see package.json test command)
console.log(`Environment is [${env}]`);

// Configure parameters depending on current environment
// NODE_ENV is 'production' in heroku by default
if (env == 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env == 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

const {
    ObjectID
} = require('mongodb');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');
var {
    authenticate
} = require('./middleware/authenticate');


var app = express();
// const port = process.env.PORT || 3000;

// Configure Middleware
app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        console.log('Saved todo');
        res.send(doc)
    }, (e) => {
        console.error(e);
        res.status(400).send(e);
    });
});

// GET /todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos,
            code: 'Success'
        })
    }, (e) => {
        console.error(e);
        res.status(400).send(e);
    });
});

// Get/todos/12345
app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    var id = req.params.id;
    // 1. Check if ObjectID is valid
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }
    Todo.findById(id)
        .then((todo) => {
            if (todo) {
                return res.status(200).send({
                    todo
                });
            }
            res.status(404).send();
        }).catch(err => {
            return res.status(400).send();
        });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send({});
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            return res.status(200).send({
                todo
            });
        }
        res.status(404).send();
    });
});

// PATCH
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // select only properties that user is allowed to update
    // e.g. we do not want user to update the 'completedAt' property
    var body = _.pick(req.body, ['text', 'completed']);
    console.log(body)
    if (!ObjectID.isValid(id)) {

        return res.status(404).send({});
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        })
        .then((todo) => {
            if (!todo) {
                return res.status(404).send();
            }

            res.status(200).send({
                todo
            });
        })
        .catch((err) => {
            res.status(400).send();
        });
});

// POST /users
// Signup
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save()
        .then(() => {
            return user.generateAuthToken();
        })
        .then((token) => {
            res.header('x-auth', token).send(user);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// we are using 'authenticate' middleware for this request
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user);
            });
        })
        .catch((e) => {
            res.status(400).send();
        });
});

// GET /users/me
// Returns user info based on passed 'auth' token
/*
app.get('/users/me', (req, res) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
            if (!user) {
                return Promise.reject();
            }

            res.send(user);
        })
        .catch((e) => {
            res.status(401).send();
        });
});
*/

// Logout - delete specific user's token
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
        .then(() => {
            res.status(200).send();
        }, () => {
            res.status(400).send();
        });
});


app.listen(process.env.PORT, () => {
    console.log('Started on port ', process.env.PORT);
});

module.exports = {
    app
};