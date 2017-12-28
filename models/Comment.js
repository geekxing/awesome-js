const db = require('../db');

module.exports = db.defineModel('comments', {
    blog_id: db.ID,
    user_id: db.ID,
    user_name: db.STRING(100),
    user_image: db.STRING(500),
    content: db.TEXT
});