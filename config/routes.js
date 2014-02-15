
// # routes

var lib, app

module.exports = function(_lib, _app) {
  lib = _lib
  app = _app
  return routes
}

function routes() {

  var controllers = require('../app/controllers')(lib)

  app.get('/', controllers.home)

}
