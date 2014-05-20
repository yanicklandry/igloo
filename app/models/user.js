
// # user

var mongoose = require('mongoose'),
    common = require('./common'),
    Schema = mongoose.Schema,
    mongooseTypes = require('mongoose-types')

mongooseTypes.loadTypes(mongoose)

//var Email = mongoose.SchemaTypes.Email

var User = new Schema({
  /*email: {
    type: Email,
    required: true,
    unique: true
  }*/
  name: String
})

User.plugin(common)

module.exports = User;


var MUser =  mongoose.model('User', User);

var user = new MUser({
  name: 'user@example.com',
});

MUser.create({name: 'john'}, function( err, project ) {
  console.log(200, 'Hello, this is Igloo.')
});

console.log(MUser.db);