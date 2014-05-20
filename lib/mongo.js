
// # mongo

var mongoose = require('mongoose')

var config

module.exports = function(_config) {
  config = _config
  return mongo
}

/**
 * Component annotations.
 */
exports['@singleton'] = true;

function mongo(callback) {
  console.log(config.db);
  var connection = mongoose.createConnection(
    config.db.host,
    config.db.dbname,
    config.db.port,
    config.db.opts
  )
  connection.on('error', callback)
  connection.on('open', function() {
    callback(null, connection)
  })
}
