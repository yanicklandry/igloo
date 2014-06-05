
// # config - app

var express = require('express')
var flash = require('connect-flash')
var development = require('./development')
var production = require('./production')
var passport = require('passport')
var settings = require('./settings')
var routes = require('./routes')
var ioc = require('electrolyte')
var session = require('express-session')
var methodOverride = require('method-override')
var errorHandler = require('errorhandler')
var serveFavicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var dataNode = require('../lib/data-node')
var helmet = require('helmet')

module.exports = function(lib, callback) {

  var app = express()

  // set the environment
  app.set('env', lib.config.env)

  // disable x-powered-by
  app.disable('x-powered-by')

  // trust proxy
  app.enable('trust proxy')

  // set the default views directory
  app.set('views', lib.config.viewsDir)

  // make jade the default view engine
  app.set('view engine', 'jade')

  // make jade pretty
  app.locals.pretty = true

  // use helmet for security
  app.use(helmet.defaults())

  // ignore GET /favicon.ico
  app.use(serveFavicon(lib.config.favicon))

  // environment configs
  switch(lib.config.env){
  case 'development':
    development(lib, app)
    break
  case 'production':
    production(lib, app)
    break
  }

  // pass a secret to cookieParser() for signed cookies
  app.use(cookieParser(lib.config.cookieParser))

  // parse request bodies
  app.use(bodyParser())

  // support _method (PUT in forms etc)
  app.use(methodOverride())

  // add req.session cookie support
  app.use(session(lib.config.session))

  // add flash message support
  app.use(flash())

  // add dynamic helpers for views
  app.use(function(req, res, next) {
    res.locals.req = req
    res.locals.messages = {
      success: req.flash('success'),
      error: req.flash('error'),
      info: req.flash('info'),
      warning: req.flash('warning')
    }
    next()
  })

  // add support for authentication
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(lib.db.model('User').createStrategy())
  passport.serializeUser(lib.db.model('User').serializeUser())
  passport.deserializeUser(lib.db.model('User').deserializeUser())

  // load the routes
  routes(lib, app)()

  // static server
  app.use(express.static(lib.config.publicDir, lib.config.staticServer))

  // error handling
  app.use(errorHandler())

  callback(null, app)

  return {
    app: app,
    lib: lib
  }

}

