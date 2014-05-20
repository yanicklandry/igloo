
// # home

var mongoose = require('mongoose')
exports = module.exports = home

function home(app, lib, modeluser) {
  return {

	  render: function(req, res, next) {
	    res.render('home')
	  },

	  about: function(req, res, next) {
      // save project data
      var User = mongoose.model('User', modeluser);
      console.log(modeluser);
      User.create({name: 'john'}, function( err, project ) {
        res.send(200, 'Hello, this is Igloo.')
      });

	  }

	}
}

exports['@require'] = [ 'mongo', 'redis', 'models/user' ];