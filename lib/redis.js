
// # redis

var express = require('express')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)

var lib

module.exports = function(_lib) {
  lib = _lib
  return redis
}

function redis(callback) {
  var connection = new RedisStore(lib.config.redis)
  connection.on('error', lib.logger.error)
  connection.on('connect', function() {
    lib.logger.info('redis connected')
  })
  callback(null, connection)
}
