const db = require('../db');
const crypto = require('crypto');
const hash = crypto.createHash('md5');

const User = db.defineModel('users', {
    email: {
        type: db.STRING(100),
        unique: true
    },
    passwd: db.STRING(100),
    name: db.STRING(100),
    gender: {
        type: db.ENUM,
        values: ['unknown', 'male', 'female']
    },
    admin: db.BOOLEAN,
    image: db.STRING(500)
});

User.beforeValidate((user, options) => {
    user.gender = user.gender || 'unknown';
    user.admin = user.admin || 0;
    user.image = '';
});

User.beforeCreate((user, options) => {
    var sha1_passwd = `${user.id}:${user.passwd}`;
    var sha1 = crypto.createHash('sha1');
    user.passwd = sha1.update(sha1_passwd).digest('hex');
    user.image = `http://www.gravatar.com/avatar/${ hash.update(encodeURI(encodeURI(user.email))).digest('hex') }?d=mm&s=120`;
});

module.exports = User;