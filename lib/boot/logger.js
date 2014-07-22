
// # boot - logger

var mergeDefaults = require('merge-defaults')
var winston = require('winston')
var winstonMongoDB = require('winston-mongodb')
var winstonHipchat = require('winston-hipchat')

exports = module.exports = function(settings) {

  var transports = []

  if (settings.logger['console'])
    transports.push(
      new winston.transports.Console(
        settings.output
      )
    )

  if (settings.logger.mongo)
    transports.push(
      new winstonMongoDB.MongoDB(
        mergeDefaults(
          settings.output,
          settings.mongo
        )
      )
    )

  if (settings.logger.file)
    transports.push(
      new winston.transports.File(
        mergeDefaults(
          settings.output,
          settings.logger.file
        )
      )
    )

  // TODO: finish this
  /*
  if (settings.logger.hipchat)
    transports.push(
      new winstonMongoDB.MongoDB(
        mergeDefaults(
          settings.output,
          settings.mongo
        )
      )
    )
  */

  var logger = new winston.Logger({
    transports: transports
  })


  return logger

}

exports['@singleton'] = true
exports['@require'] = [ 'igloo/settings' ]
