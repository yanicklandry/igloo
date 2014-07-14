
// # boot - knex

exports = module.exports = function(logger, settings) {
  var knex = require('knex')(settings.knex)
  knex.on('error', logger.error)
  return knex
}

exports['@singleton'] = true
exports['@require'] = [ 'igloo/logger', 'igloo/settings' ]
