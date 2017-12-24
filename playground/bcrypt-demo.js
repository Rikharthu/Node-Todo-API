const bcrypt = require('bcryptjs');

var password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('password', password);
        console.log('salt', salt);
        console.log('hash', hash);
    });
});

var hashedPassword = '$2a$10$GjwgESczyPQLVis6SuuKKu8TRCIeK88.YyVEMIgVSJ1CZSoMR5dxm';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// Promise versions
bcrypt.compare(password, hashedPassword)
    .then(res => {
        console.log('password and hash matches', res);
    })
    .catch(err => {
        console.log('password and hash do not match', err);
    });

bcrypt.genSalt(10)
    .then((salt) => {
        console.log('salt:', salt);
        return bcrypt.hash(password, salt);
    })
    .then((hash) => {
        console.log('hash:', hash);
    })
    .catch((err) => {
        console.error('error:', err);
    });