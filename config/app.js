
// # app

var express = require('express')
var flash = require('connect-flash')
var dynamicHelpers = require('./dynamic-helpers')
var development = require('./development')
var production = require('./production')
var auth = require('./auth')
var routes = require('./routes')

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

  // ignore GET /favicon.ico
  app.use(express.favicon(lib.config.favicon))

  // development only config
  app.configure('development', development(lib, app))

  // production only config
  app.configure('production', production(lib, app))

  // pass a secret to cookieParser() for signed cookies
  app.use(express.cookieParser(lib.config.cookieParser))

  // parse request bodies
  app.use(express.json())
  app.use(express.urlencoded())

  // support _method (PUT in forms etc)
  app.use(express.methodOverride())

  // add req.session cookie support
  app.use(express.session(lib.config.session))

  // add flash message support
  app.use(flash())

  // add dynamic helpers for views
  app.use(dynamicHelpers)

  // add support for authentication
  app.configure(auth(lib, app))

  // load the routes
  app.configure(routes(lib, app))

  // make the middleware order matter
  app.use(app.router)

  // static server
  app.use(express.static(lib.config.publicDir, lib.config.staticServer))

  // error handling
  app.use(express.errorHandler())

  callback(null, app)

}
