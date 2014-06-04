
// # app

var express = require('express')
var updateNotifier = require('update-notifier')
var winstonRequestLogger = require('winston-request-logger')
var bootable = require('bootable')
var bootableEnvironment = require('bootable-environment')
var path = require('path')
var pkg = require(path.join(__dirname, '..', 'package'))

exports = module.exports = function(logger, settings) {

  // check for updates to igloo
  if (settings.updateNotifier) {

    var notifier = updateNotifier({
      packageName: pkg.name,
      packageVersion: pkg.version
    })

    if (notifier.update)
      logger.warn(
        'v%s of %s is now available (current: %s), run `npm update %s` to upgrade',
        notifier.update.latest,
        pkg.version,
        pkg.name,
        pkg.name
      )

  }

  // create the app
  var app = bootable(express())

  // winston request logger before everything else
  // but only if it was enabled in settings
  if (settings.logger.requests)
    app.use(winstonRequestLogger.create(logger))

  app.phase(bootableEnvironment())
  app.phase(bootable.initializers())
  app.phase(bootable.routes())

  return app

}

exports['@singleton'] = true
exports['@require'] = [ 'logger', 'settings' ]
