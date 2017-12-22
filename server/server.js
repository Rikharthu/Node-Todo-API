const {
    ObjectID
} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000;

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
            res.status(404).send({});
        }).catch(err => {
            return res.status(400).send({});
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
        res.status(404).send({});
    });
});

app.listen(port, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
};