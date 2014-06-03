
// # app

var express = require('express')
var bootable = require('bootable')
var IoC = require('electrolyte')
var bootableEnvironment = require('bootable-environment')

exports = module.exports = function(logger, settings) {

  var app = bootable(express())
  app.phase(bootableEnvironment())
  app.phase(bootable.initializers())
  app.phase(bootable.routes())

  return app

}

exports['@singleton'] = true
exports['@require'] = [ 'logger', 'settings' ]
