const {
    SHA256
} = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`message:\t${message}\nhash:\t\t${hash}`);

// Creating a token
var data = {
    id: 4
};

// Salt
var secret = 'some_secret_salt';

// Important - add salt to the hash to avoid issues where exploiter just changes data and rehashes it on its own
var token = {
    data,
    hash: SHA256(JSON.stringify(data) + secret).toString()
}

console.log(`Data: ${JSON.stringify(data)}`);
console.log(`Token: ${JSON.stringify(token)}`);


var resultHash = SHA256(JSON.stringify(token.data) + secret).toString();
console.log(resultHash);


// How man in the middle attacks?
// I am user 4. I am mad at user 5. I want to delete all his data.
token.data.id = 5;
// Person in the middle do not have access to our salt
token.hash = SHA256(JSON.stringify(data)).toString();


if (resultHash === token.hash) {
    console.log('Data was not changed')
} else {
    console.log('Data was changed. Do not trust!');
}

// Basically this is how JWT (JSON Web Token) works.