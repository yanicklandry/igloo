
// # boot - sessions

var session = require('express-session')
var RedisStore = require('connect-redis')(session)

exports = module.exports = function(logger, settings) {

  var connection = new RedisStore(settings.redis)

  connection.on('error', logger.error)

  connection.on('connect', function() {
    logger.info('redis connected')
  })

  return connection

}

exports['@singleton'] = true
exports['@require'] = [ 'igloo/logger', 'igloo/settings' ]
