
// # app

var express = require('express')
var winstonRequestLogger = require('winston-request-logger')
var bootable = require('bootable')
var bootableEnvironment = require('bootable-environment')
var _ = require('underscore')
var updateNotifier = require('update-notifier')
var path = require('path')

exports = module.exports = function(logger, settings) {

  // check for updates to all packages when not in production
  if (settings.updateNotifier.enabled)
    _.each(settings.pkg.dependencies, function(version, name) {
      var notifier = updateNotifier({
        packageName: name,
        packageVersion: version,
        optOut: settings.updateNotifier.dependencies[name] || false,
        updateCheckInterval: settings.updateNotifier.updateCheckInterval | 1000 * 60 * 60, // hourly
        updateCheckTimeout: settings.updateNotifier.updateCheckTimeout | 1000 * 20 // 20 seconds
      })
      if (_.isUndefined(notifier.update)) return
      logger.warn(
        '%s of %s released (current: %s), run `npm install -S %s@%s` to upgrade',
        notifier.update.latest,
        name,
        version,
        name,
        notifier.update.latest
      )
    })

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
