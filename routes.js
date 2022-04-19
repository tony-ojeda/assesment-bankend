const user = require('./api/user');

function routes(app) {
    app.use('/api/v1/users', user)
}

module.exports = routes;