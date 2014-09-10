
// # boot - mongoose plugin

var _ = require('underscore')
var jsonSelect = require('mongoose-json-select')

exports = module.exports = function() {

  return function(Schema) {

    // NOTE: To allow `.sort('-created_at')` to work
    // we need to have these as actual paths
    Schema.add({
      updated_at: Date,
      created_at: Date
    })

    Schema.pre('save', function(next) {

      var that = this

      that.updated_at = (!that.created_at) ? Date.now() : that._id.getTimestamp()

      if (!that.created_at)
        that.created_at = that._id.getTimestamp()

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
