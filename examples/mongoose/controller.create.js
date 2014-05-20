/**
 * Mongoose create route.
 * Use this in a controller and setup a route
 * to create function.
 */

exports = module.exports = home

function home(db, _User) {
  return {

    create: function(req, res, next) {

      // create user object using db ('lib/db') connection
      // and models/user
      
      var User = db.model('User', _User);

      User.create({email: 'somebody@example.com'}, function( err, user ) {
        if(err)
          res.send(500, 'Igloo: Something went wrong.')
        else
          res.send(200, 'Igloo: Created user.')
      });

    }

  }
}

exports['@require'] = [ 'lib/db', 'models/user' ];