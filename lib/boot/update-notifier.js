
// # boot - update notifier

var _ = require('underscore')
var updateNotifier = require('update-notifier')

exports = module.exports = function(logger, settings) {

  return function() {

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
        if (_.isUndefined(notifier.update) || !_.isString(notifier.update.latest)) return
        logger.warn(
          '%s of %s released (current: %s), run `npm install -S %s@%s` to upgrade',
          notifier.update.latest,
          name,
          version,
          name,
          notifier.update.latest
        )
      })

  }

}

exports['@singleton'] = true
exports['@require'] = [ 'igloo/logger', 'igloo/settings' ]
