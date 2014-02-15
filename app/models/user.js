
// # user

var mongoose = require('mongoose')
var common = require('./common')

var Schema = mongoose.Schema
var mongooseTypes = require('mongoose-types')
mongooseTypes.loadTypes(mongoose)

var Email = mongoose.SchemaTypes.Email

var User = module.exports = new Schema({
  email: {
    type: Email,
    required: true,
    unique: true
  }
})

User.plugin(common)
