
// # lib

module.exports = function(config) {
  var lib = {
    mongo: require('./mongo')(config),
    redis: require('./redis')(config),
    logger: require('./logger')
  }
  lib.config = config
  return lib
}

