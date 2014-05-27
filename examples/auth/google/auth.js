
// # examples - auth - google

/*globals lib*/

// Add to `config/app.js`:

var randomstring = require('randomstring-extended')
var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.use(new GoogleStrategy({
  callbackURL: lib.config.url + '/auth/google/callback',
  clientID: lib.config.google.clientID,
  clientSecret: lib.config.google.clientSecret
}, authCallback))

function authCallback(token, tokenSecret, profile, done) {

  lib.db.model('User').findOne({
    email: profile._json.email
  }, findUserByEmail)

  function findUserByEmail(err, user) {
    if (err) return done(err)
    if (user) return done(null, user)
    user = {
      email: profile._json.email,
      name: profile.name.givenName,
      surname: profile.name.familyName
    }
    if (profile.provider === 'google') {
      user.google_access_token = token
      user.avatar_url = profile._json.picture
    }
    lib.db.model('User').register(user, randomstring.token(), findUserByEmail)
  }

}
