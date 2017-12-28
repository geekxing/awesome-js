const products = require('../products');

const APIError = require('../rest').APIError;
const APIValueError = require('../rest').APIValueError;

const model = require('../model');
const exp = require('../db');


let
    User = model.User,
    _RE_EMAIL = /^[a-z0-9\.\-\_]+\@[a-z0-9\-\_]+(\.[a-z0-9\-\_]+){1,4}$/,
    _RE_SHA1 = /^[0-9a-f]{40}$/,
    COOKIE_NAME = 'awesession',
    _COOKIE_KEY = 'Awesome';

function user2cookie(user, maxAge) {
    var now = new Date();
    var expires = (now.getTime() + maxAge).toString();
    var s = `${user.id}-${user.passwd}-${expires}-${_COOKIE_KEY}`;
    var sha1 = require('crypto').createHash('sha1');
    var cookie_comps = [user.id, expires, sha1.update(s).digest('hex')];
    return cookie_comps.join('-');
}

module.exports = {
    'GET /api/products': async (ctx, next) => {
        ctx.rest({
            products: products.getProducts()
        });
    },

    'POST /api/products': async (ctx, next) => {
        var p = products.createProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price));
        ctx.rest(p);
    },

    'POST /api/register': async (ctx, next) => {
        var
            name = ctx.request.body.name,
            email = ctx.request.body.email,
            passwd = ctx.request.body.passwd;
        if (! name || !name.trim()) {
            throw new APIValueError('');
        }
        if (! email || !_RE_EMAIL.test(email)) {
            throw new APIValueError('');
        }
        if (! passwd || !_RE_SHA1.test(passwd)) {
            throw new APIValueError('');
        }
        var users = await User.findAll({ where: { email: email }});
        if (users.length > 0) {
            throw new APIError('register:failed', 'Email is already in use.')
        }
        var uid = exp.generateId();
        var user = await User.create({'id':uid, 'name':name, 'email':email, 'passwd':passwd});

        ctx.cookies.set(COOKIE_NAME, user2cookie(user, 86400), { 'maxAge':86400 });
        user.passwd = '******';
        ctx.rest(user);
    },

    'POST /api/authenticate': async (ctx, next) => {

    },

    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        var p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else  {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};