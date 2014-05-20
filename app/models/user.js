
// # user

var mongoose = require('mongoose'),
    common = require('./common'),
    Schema = mongoose.Schema,
    mongooseTypes = require('mongoose-types')

mongooseTypes.loadTypes(mongoose)

var Email = mongoose.SchemaTypes.Email

var User = new Schema({
  email: {
    type: Email,
    required: true,
    unique: true
  }
})

User.plugin(common)

module.exports = User;