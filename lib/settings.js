
// # settings

var _ = require('underscore')

exports = module.exports = function(config) {

  var settings = {}

  _.defaults(settings, config.defaults)

  var env = process.env.NODE_ENV || 'development'

  _.defaults(settings, config[env])

  return settings

}

exports['@singleton'] = true
exports['@require'] = [ 'config' ]
