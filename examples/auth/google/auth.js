/**
 * Add following code to auth() function in
 * ./config/auth.js
 *
 * It's better to keep 'returnURL' and 'realm'
 * in settings.
 */


var GoogleStrategy = require('passport-google').Strategy

passport.use( new GoogleStrategy({
    returnURL: 'http://localhost:3000/auth/google/callback',
    realm: 'http://localhost:3000',
    passReqToCallback: true
  },
  function(req, identifier, profile, done) {

    var email = profile.emails[ 0 ].value
    var User = lib.db.model('User')

    // save user
    User.findOne({
        email: email
    }, function( err, user ) {

      if (!user) {
        User.create({
          email: email,
          name: profile.displayName,
        }, function(err, user) {

          // Update lastToken
          user.lastToken = identifier
          user.save()
          return done( err, user )
        });

      } else {
        // Update lastToken
        user.lastToken = identifier
        user.save()
        return done( err, user )
      }
      
    });
  }
));