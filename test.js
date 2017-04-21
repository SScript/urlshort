    
    var express = require('express')
    var path = require('path')
    var favicon = require('serve-favicon')
    var logger = require('morgan')
    var cookieParser = require('cookie-parser')
    var bodyParser = require('body-parser')

    var mongo = require('mongodb')

    var routes = require('./routes/index')
    var users = require('./routes/users')

    var app = express()

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'jade')

    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended}))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname)))

    app.use('/', routes)
    app.use('/users', users)

    