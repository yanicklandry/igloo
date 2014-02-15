
// # development

var winstonRequestLogger = require('winston-request-logger')
var lessMiddleware = require('less-middleware')

var lib, app

module.exports = function(_lib, _app) {
  lib = _lib
  app = _app
  return development
}

function development() {

  // winston logger
  app.use(winstonRequestLogger.create(lib.logger))

  // less middleware
  app.use(lessMiddleware(lib.config.lessMiddleware))

}
