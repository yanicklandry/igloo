
// # lib

module.exports = function(config) {
  var lib = {
    config: config,
    logger: require('./logger')
  }
  lib.mongo = require('./mongo')(lib)
  lib.redis = require('./redis')(lib)
  return lib
}
