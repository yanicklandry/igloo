
// # boot - knex

var knex = require('knex')

exports = module.exports = function(logger, settings) {
  return knex(settings.knex)
}

exports['@singleton'] = true
exports['@require'] = [ 'igloo/logger', 'igloo/settings' ]
