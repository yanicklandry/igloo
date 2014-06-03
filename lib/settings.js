
// # settings

var mergeDefaults = require('merge-defaults')

exports = module.exports = function(config) {

  var settings = {}

  var env = process.env.NODE_ENV || 'development'

  mergeDefaults(settings, config[env], config.defaults)

  return settings

}

exports['@singleton'] = true
exports['@require'] = [ 'config' ]
