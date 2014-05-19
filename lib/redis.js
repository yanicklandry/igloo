
// # redis

var express = require('express')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)

var config

module.exports = function(_config) {
  config = _config
  return redis
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;

function redis(callback) {
  var connection = new RedisStore(config.redis)
  connection.on('error', callback)
  connection.on('connect', function() {
    callback(null, connection)
  })
}
