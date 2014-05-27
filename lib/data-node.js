
//
// # data node
//
// This is the missing data injection functionality in
// electrolyte. Based on electrolyte/loaders/node.js, the
// default script loader.
//

var _ = require('underscore')

module.exports = function(data, options) {

  if (_.isString(options))
    options = {
      dirname: options
    }

  return function(id) {

    var newId = null

    if (id) {
      var dir = options.dirname + '/'
      if (id.indexOf(dir) === 0)
        newId = id.substr(dir.length)
    }

    if (newId)
      return data[newId]

    return data

  }

}
