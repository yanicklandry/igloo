
// # schemas

var _ = require('underscore')

var models = require('../app/models')

module.exports = schemas

function schemas(lib, callback) {

  _.each(models, function(schema, name) {
  	console.log(name, '333');
    lib.db.model(name, schema)
  })

  callback(null, lib)

}
