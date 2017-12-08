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

    // More info about Update operators:
    // https://docs.mongodb.com/manual/reference/operator/update/

    db.collection('Todos')
        .findOneAndUpdate({ // filter/query
            _id: new ObjectID('5a2aa6ebf2f8ca48c1e9d052')
        }, {
            $set: {
                completed: true
            }
        }, {
            // options
            returnOriginal: false
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log('Could not update a document', err);
        })

    // Using $inc operator
    db.collection('Users')
        .findOneAndUpdate({
            name: 'Jan'
        }, {
            // increment age property by 1
            $inc: {
                age: 1
            }
        }, {
            // options
            returnOriginal: false
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log('Could not update a document', err);
        })

    db.close();
});