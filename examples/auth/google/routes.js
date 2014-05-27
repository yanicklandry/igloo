
// # examples - auth - google

/*globals app,lib*/

// Add to `config/routes.js`:

var passport = require('passport')
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
var ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut

// google oauth
app.get('/auth/google', ensureLoggedOut(), passport.authenticate('google', {
  scope: lib.config.google.scope
}))
app.get('/auth/google/callback', ensureLoggedOut(), passport.authenticate('google', {
  successFlash: true,
  successReturnToOrRedirect: '/',
  failureFlash: true,
  failureRedirect: '/login'
}))
