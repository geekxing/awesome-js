// MVC Controllers
const model = require('../model');

let User = model.User;

module.exports = {
    'GET /': async (ctx, next) => {
        var users = await User.findAll();
        ctx.render('index.html', users);
    },

    'GET /signin': async (ctx, next) => {
        ctx.render('signin.html');
    },

    'GET /register': async (ctx, next) => {
        ctx.render('register.html');
    },

    'GET /test': async (ctx, next) => {
        ctx.render('test.html', {'message':'Hello Vue.js!'});
    },
};