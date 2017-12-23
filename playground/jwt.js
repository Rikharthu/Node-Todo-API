const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var secret = '123abc';

// 
var token = jwt.sign(data, secret); // This is what we give to the user upon signing in
console.log(token);

// Takes the signed token and verifies that it has not been manipulated
var decoded = jwt.verify(token, secret);
console.log('decoded', decoded);