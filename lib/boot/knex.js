
// # boot - knex

exports = module.exports = function(logger, settings) {
  var knex = require('knex')(settings.knex)
  knex.on('error', function(err) {
    logger.error(err)
  })
  return knex
}

exports['@singleton'] = true
exports['@require'] = [ 'igloo/logger', 'igloo/settings' ]
