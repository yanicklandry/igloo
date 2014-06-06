
// # boot - model common plugin

var _ = require('underscore')
var jsonSelect = require('mongoose-json-select')

exports = module.exports = function(settings) {

  return function(Schema) {

    // NOTE: To allow `.sort('-created_at')` to work
    // we need to have these as actual paths
    Schema.add({
      updated_at: Date,
      created_at: Date
    })

    if (settings.mongooseVersioning)
      Schema.add({
        __versions: []
      })

    Schema.pre('save', function(next) {

      var that = this

      that.updated_at = (!that.created_at) ? Date.now() : that._id.getTimestamp()

      if (!that.created_at)
        that.created_at = that._id.getTimestamp()

      // version history (alternative to `mongoose-version` and `mongoose-history`)
      if (settings.mongooseVersioning) {
        var version = that.toObject()
        version.__v = _.isNumber(version.__v) ? version.__v + 1 : 0
        delete version.__versions
        that.__versions.push(version)
      }
      next()
    })

    Schema.set('toObject', {
      virtuals: true,
      getters: true
    })

    Schema.set('toJSON', {
      virtuals: true,
      getters: true
    })

    Schema.plugin(jsonSelect, '-_id -__v')

    return Schema

  }

}

exports['@singleton'] = true
exports['@require'] = [ 'settings' ]
