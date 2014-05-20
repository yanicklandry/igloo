/**
 * Add following code to routes() function in
 * your ./config/routes.js file.
 */

var passport = require('passport')

// auth route

app.get('/auth/google', function(req,res,next) { 
		// add remember me details etc. here
   	next()
  },
  passport.authenticate('google', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
  	res.redirect('/')
  });

// auth callback

app.get('/auth/google/callback',
  passport.authenticate( 'google', {
    failureRedirect: '/'
  }),
  function(req, res, next) {
    var redirectTo = req.session.redirectTo;

    // Successful authentication, redirect to dashboard page.
    if ( redirectTo ) {
        req.session.redirectTo = null
        res.redirect(redirectTo)
    } else {
        res.redirect('/logged-in')
    }
  }
);

// log out

app.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
});

// sample log-in message

app.get('/logged-in', function(req, res){
  req.send(200, 'Hey!')
});