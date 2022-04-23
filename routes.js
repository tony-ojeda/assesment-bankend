const user = require('./api/user');
const favorite = require('./api/favorite');
const item = require('./api/item');
const auth = require('./auth/local')

function routes(app) {
    app.use('/auth/local', auth)
    app.use('/api/users', user)
    app.use('/api/favs', favorite)
    app.use('/api/items', item)
}

module.exports = routes;