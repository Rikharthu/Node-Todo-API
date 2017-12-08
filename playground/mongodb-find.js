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

    // find all documents
    db.collection('Todos')
        .find() // returns cursor to the db data
        .toArray()
        .then((docs) => {
            console.log('Todos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    // Show only completed todos
    db.collection('Todos')
        // pass the query to the find(<query>) method
        .find({
            completed: true
        })
        .toArray()
        .then((docs) => {
            console.log('\nCompleted todos');
            console.log(JSON.stringify(docs, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    // Find by Id
    db.collection('Todos')
        .find({
            // _id is not a string, it's an object
            _id: ObjectID("5a26ebeb1ce9213538842f35")
        })
        .toArray()
        .then((docs) => {
            console.log('\nTodo with id 5a26ebeb1ce9213538842f35:');
            console.log(JSON.stringify(docs[0], undefined, 2));
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    // Count the results returned
    db.collection('Todos')
        .find() // returns cursor to the db data
        .count() // method of cursor that return count of items fetched
        .then((count) => {
            console.log(`\nTotal todos: ${count}`);
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    // Count how many 'Andrew' we have in users collection
    db.collection('Users')
        .find({
            name: 'Andrew'
        })
        .count()
        .then((count) => {
            console.log(`\nTotal Andrew\'s: ${count}`);
        }, (err) => {
            console.log('Unable to fetch Andrews', err);
        });

    db.close();
});