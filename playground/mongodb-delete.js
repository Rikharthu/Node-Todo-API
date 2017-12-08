const {
    MongoClient,
    ObjectID
} = require('mongodb');

const databaseUrl = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(databaseUrl, (err, db) => {
    if (err) {
        return console.error('Unable to connect to MongoDB Server');
    }
    console.log('Succesfully connected to MongoDB Server');

    // Seed db for deletion demo
    db.collection('Todos').insertMany([{
        text: 'Eat lunch',
        completed: false
    }, {
        text: 'Eat lunch',
        completed: false
    }, {
        text: 'Eat lunch',
        completed: false
    }, {
        text: 'Eat lunch',
        completed: false
    }, {
        text: 'Eat lunch',
        completed: false
    }, {
        text: 'Eat lunch',
        completed: false
    }]).catch(err => {
        return console.error('Unable to insert user', err);
    });

    // First list all todos
    db.collection('Todos')
        .find() // returns cursor to the db data
        .toArray()
        .then((docs) => {
            console.log(`All todos (${docs.length})`);
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    // deleteOne
    // deletes only first matching document
    db.collection('Todos')
        .deleteOne({
            text: 'Eat lunch'
        })
        .then(opResult => {
            // http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#~deleteWriteOpResult
            console.log('\nDeleted one \'Eat lunch\' todo: ', opResult.result.n); // opResult.result.n - number of deleted documents
        });

    // findOneAndDelete
    // Deletes on document while also providing it back (in case you wan't to restore it, like "undo")
    db.collection('Todos')
        .findOneAndDelete({
            text: 'Eat lunch'
        })
        .then(result => {
            console.log('Deleted todo: ', JSON.stringify(result));
        });


    // deleteMany
    db.collection('Todos')
        .deleteMany({
            text: 'Eat lunch'
        })
        .then(opResult => {
            console.log('\nDeleted \'Eat lunch\' todos: ', opResult.result.n);
        });

    db.close();
});