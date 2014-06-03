
// # logger

var winston = require('winston')

exports = module.exports = function(settings) {

  var logger = module.exports = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({
        colorize: true
      })
    ]
  })

  return logger

}

exports['@singleton'] = true
exports['@require'] = [ 'settings' ]
