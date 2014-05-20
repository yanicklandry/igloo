
// # auth

var passport = require('passport')
var lib, app

module.exports = function(_lib, _app) {
  lib = _lib
  app = _app
  return auth
}

function auth() {

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)

  // TODO: add your passport auth here

}

function serializeUser(user, done) {
  done(null, user.id)
}

function deserializeUser(id, done) {
  lib.db.model('User').findById(id, function(err, user) {
    done(err, user)
  })
}


 

