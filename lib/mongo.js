
// # mongo

var mongoose = require('mongoose')

var lib

module.exports = function(_lib) {
  lib = _lib
  return mongo
}

function mongo(callback) {
  var connection = mongoose.createConnection(
    lib.config.db.host,
    lib.config.db.dbname,
    lib.config.db.port,
    lib.config.db.opts
  )
  connection.on('error', lib.logger.error)
  connection.on('open', function() {
    lib.logger.info('mongo connection opened')
  })
  callback(null, connection)
}
