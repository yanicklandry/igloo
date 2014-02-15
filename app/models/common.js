
// # common

module.exports = common

function common(Schema) {

  Schema.virtual('id').get(function() {
    return this._id.valueOf()
  })

  Schema.add({
    updated: {
      default: Date.now,
      type: Date
    }
  })

  Schema.virtual('created').get(function() {
    return this._id.getTimestamp()
  })

  Schema.pre('save', function(next) {
    this.updated = Date.now()
    next()
  })

}
