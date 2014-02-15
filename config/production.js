
// # production

var winston = require('winston')
var winstonMongoDB = require('winston-mongodb')
var express = require('express')

var lib, app

module.exports = function(_lib, _app) {
  lib = _lib
  app = _app
  return production
}

function production() {

  // enable view caching
  app.enable('view cache')

  // compress response data with gzip/deflate
  // this overwrites res.write and res.end functions
  app.use(express.compress())

  // mongo transport for winston logging
  lib.logger.remove(winston.transports.Console)
  winstonMongoDB.add(winstonMongoDB.MongoDB, lib.config.winstonMongoDB)

}
