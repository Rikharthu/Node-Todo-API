var mongoose = require('mongoose');

// Configure mongoose promises
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});

module.exports={
    mongoose
};