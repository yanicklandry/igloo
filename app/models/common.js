
// # models - common

var jsonSelect = require('mongoose-json-select')

module.exports = common

function common(Schema) {

  // NOTE: To allow `.sort('-created_at')` to work
  // we need to have these as actual paths
  Schema.add({
    updated_at: Date,
    created_at: Date
  })

  Schema.pre('save', function(next) {
    this.updated_at = (!this.created_at) ? Date.now() : this._id.getTimestamp()
    if (!this.created_at)
      this.created_at = this._id.getTimestamp()
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

}
