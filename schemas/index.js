
// # schemas

var _ = require('underscore')

var models = require('../app/models')

module.exports = schemas

function schemas(lib, callback) {

  _.each(models, function(schema, name) {
    lib.db.model(name, schema)
  })

  callback(null, lib)

}
