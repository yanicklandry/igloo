
// # models - user

var mongoose = require('mongoose')
var common = require('./common')
var Schema = mongoose.Schema
var mongooseTypes = require('nifty-mongoose-types')
var jsonSelect = require('mongoose-json-select')
var passportLocalMongoose = require('passport-local-mongoose')

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

User.virtual('type').get(function() {
  return 'User'
})

User.plugin(common)

User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  userExistsError: 'User already exists with email %s'
})

User.plugin(jsonSelect, '-_group -salt -hash')

module.exports = User
