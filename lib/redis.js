
// # redis

var express = require('express')
var RedisStore = require('connect-redis')(express)

var config

module.exports = function(_config) {
  config = _config
  return redis
}

function redis(callback) {
  var connection = new RedisStore(config.redis)
  connection.on('error', callback)
  connection.on('connect', function() {
    callback(null, connection)
  })
}
