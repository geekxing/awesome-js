const db = require('../db');

module.exports = db.defineModel('blogs', {
    user_id: db.ID,
    user_name: db.STRING(100),
    user_image: db.STRING(500),
    name: db.STRING(100),
    summary: db.STRING(200),
    content: db.TEXT
});