
var path = require('path')

module.exports = {
  loader: function(id) {
    return require(path.join(__dirname, 'lib', 'boot', id))
  },
  app: function(IoC) {
    return require(path.join(__dirname, 'lib'))(IoC)
  }
}
