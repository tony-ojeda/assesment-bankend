const morgan = require('morgan');
const express = require('express')
const cors = require('cors');

function config(app) {
    app.use(cors())
    app.use(morgan('dev'))
}

module.exports = config;