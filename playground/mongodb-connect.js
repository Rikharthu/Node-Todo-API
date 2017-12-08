// Install the mongodb package
// const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID // lets us make new ObjectIDs on the fly
} = require('mongodb');

// Generate new object id
var obj = new ObjectID()
console.log(obj)

// Object destructuring
var user = {
    name: 'Andrew',
    age: 25
};

// extract name property in a variable
var {
    name
} = user
console.log(name)

// Use MongoClient to connect to the database
const databaseUrl = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(databaseUrl, (err, db) => {
    if (err) {
        return console.error('Unable to connect to MongoDB Server');
    }

    console.log('Succesfully connected to MongoDB Server');

    // Insert some data in a collection
    /*
    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, res) => {
        if (err) {
            return console.error('Unable to insert todo');
        }

        console.log(JSON.stringify(res.ops, undefined, 2));
    });
    */

    // Insert new doc into Users (name, age, location)
    /*
    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }, (err, res) => {
        if (err) {
            return console.error('Unable to insert user', err);
        }

        console.log(JSON.stringify(res.ops, undefined, 2));
    });
    */

    /*
    About default generated _id property
    First four bytes - timestamp when id was created
    Next 3 bytes - machine identifiers
    Next 2 bytes - process id
    Last 3 bytes - counter/random value

    id: 5a26ecbd678f882dacc8d57e
    Timestamp: 5a26ecbd, = 1512500413 seconds since Jan 01, 1970
    Machine ids: 678f88
    Process id: 2dac
    Counter: c8d57e

    P.S. You can also specify your own id:
    {
        _id: 123,
        text: 'Something to do',
        completed: false
    }
    */
    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }, (err, res) => {
        if (err) {
            return console.error('Unable to insert user', err);
        }

        // Extract the timestamp part of the id (when the object was created)
        console.log(res.ops[0]._id.getTimestamp());
    });

    // Don't forget to close the connection when it is not needed anymore!
    db.close();
});