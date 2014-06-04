
// # mongo

var mongoose = require('mongoose')

exports = module.exports = function(logger, settings) {

  var connection = mongoose.createConnection(
    settings.mongo.host,
    settings.mongo.dbname,
    settings.mongo.port,
    settings.mongo.opts
  )

  connection.on('error', logger.error)

  connection.on('open', function() {
    logger.info('mongo connection opened')
  })

  return connection

}

exports['@singleton'] = true
exports['@require'] = [ 'logger', 'settings' ]
