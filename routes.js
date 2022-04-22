const user = require('./api/user');
const auth = require('./auth/local')

function routes(app) {
    app.use('/api/auth/local', auth)
    app.use('/api/users', user)
}

module.exports = routes;