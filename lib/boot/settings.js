
// # boot - settings

var _ = require('underscore')
var util = require('util')
var mergeDefaults = require('merge-defaults')

exports = module.exports = function(config, local) {

  var settings = {}

  var env = process.env.NODE_ENV || 'development'

  if (!_.isObject(local))
    local = {}

  mergeDefaults(config, local)

  if (!_.isObject(config[env]))
    throw new Error(util.format('Unknown environment %s', env))

  mergeDefaults(settings, config[env], config.defaults)

  return settings

}

exports['@singleton'] = true
exports['@require'] = ['config']

var fs = require('fs')
var path = require('path')
var localPath = path.join(__dirname, '..', '..', '..', '..' ,'boot', 'local.js')

// Include local.js if it exists at boot/local.js
if (fs.existsSync(localPath)) {
  exports['@require'].push('local')
}
