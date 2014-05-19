
// # home

exports = module.exports = home

function home(app, lib, modeluser) {
  return {

	  render: function(req, res, next) {
	    res.render('home')
	  },

	  about: function(req, res, next) {
      // save project data
      var User = modeluser;

      console.log(User);

      /*var user = new User({
          email: 'user@example.com',
      });
*/
      var upsertData = User;//user.toObject();
      delete upsertData._id;
	
      User.update({email: 'user@example.com'}, upsertData, {upsert: true}, function( err, project ) {

          if(err){
              res.send(500, {message: 'Error saving project data'});
              return console.error('Error creating project data');
          }

          res.send(200, {message: 'success'});

      });

	  	res.send(200, 'Hello, this is Igloo.')
	  }

	}
}

exports['@require'] = [ 'mongo', 'redis', 'models/user' ];