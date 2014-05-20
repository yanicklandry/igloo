/**
 * Module dependencies.
 */
var config = require('./index');


/**
 * Initialize settings.
 */
exports = module.exports = function(lib, app) {
  var settings = new Settings(config);
  return settings;
}


/**
 * Component annotations.
 */
exports['@singleton'] = true;


/**
 * Settings component
 */

function Settings(initial) {
  if(initial)
  	this._hash = initial;
  else
  	this._hash = {};
}

Settings.prototype.get = function(key) {
  return this._hash[key];
}

Settings.prototype.set = function(key, val) {
  this._hash[key] = val;
}