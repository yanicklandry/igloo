
// # error handler

var _ = require('underscore')
var util = require('util')

exports = module.exports = function(logger, settings) {

  return function(err, req, res, next) {

    // set default error status code
    res.statusCode = (_.isNumber(err.status)) ? err.status : 500

    if (!_.isString(err.message))
      err.message = 'An unknown error has occured, please try again'

    if (_.isObject(err) && _.isNumber(err.code) && err.code === 11000) {
      err.message = 'Duplicate document already exists in database, try making a more unique value'
      err.param = ''
    }

    // if we pass an error object, then we want to simply return the message...
    // if we pass an object, then we want to do a stack trace, and then return the object + stack
    var error = {}

    // set error type
    error.type = _.isString(err.param) ? 'invalid_request_error' : 'api_error'

    if (error.type === 'invalid_request_error' && res.statusCode === 500)
      res.statusCode = 400

    // set error message and stack trace
    if (util.isError(err)) {
      error.message = err.message
    } else {
      _.extend(error, err)
    }

    // set status code for BadRequestError
    if (_.isString(error.name) && error.name === 'BadRequestError') {
      error.type = 'invalid_request_error'
      res.statusCode = 400
      delete error.name
    }

    if (settings.showStack)
      error.stack = _.isUndefined(err.stack) ? new Error(err.message).stack : err.stack

    // set error level
    var level = (res.statusCode < 500) ? 'warn' : 'error'
    logger[level](error)

    // set error back to warning if it was warn
    // logger level type = "warn"
    // req.flash messages type = "warning"
    if (level === 'warn')
      level = 'warning'

    // if we have a mongoose validation err
    // then we know to output all the errors
    if (_.isObject(error.errors) && !_.isEmpty(error.errors)) {
      var messages = []
      _.each(error.errors, function(errMsg) {
        if (_.isString(errMsg.message))
          messages.push(errMsg.message)
      })
      if (!_.isEmpty(messages))
        error.message = messages.join(' ')
    }

    res.format({
      text: function() {
        res.send(error.message)
      },
      html: function() {
        req.flash(level, error.message)
        res.redirect('back')
      },
      json: function() {
        res.json({ error: error })
      }
    })

  }

}

exports['@singleton'] = true
exports['@require'] = [ 'logger', 'settings' ]
