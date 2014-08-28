
// # boot - settings

var _ = require('underscore')
var util = require('util')
var mergeDefaults = require('merge-defaults')

exports = module.exports = function(config, local) {

  var settings = {}

  var env = process.env.NODE_ENV || 'development'

  if (!_.isObject(config[env]))
    throw new Error(util.format('Unknown environment %s', env))

  if (!_.isObject(local))
    local = {}

  mergeDefaults(settings, local, config[env], config.defaults)

  return settings

}

exports['@singleton'] = true
exports['@require'] = [ 'config' ]
