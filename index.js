
//     igloo
//     Copyright (c) 2014- Nick Baugh <niftylettuce@gmail.com> (http://niftylettuce.com)
//     MIT Licensed

// Igloo is a lightweight, fast, and minimal framework for rapid development

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source: <https://github.com/niftylettuce/igloo>

// Special thanks to TJ Holowaychuk for being an inspiration,
// Jared Hanson for introducing me to `electrolyte`,
// and many others which I'd love to credit...

// # igloo

var path = require('path')
var os = require('os')
var cluster = require('cluster')

var bootDir = path.join(__dirname, 'boot')

module.exports = {
  loader: function(id) {
    return require(path.join(bootDir, id))
  },
  app: function(IoC) {
    IoC.loader(IoC.node(bootDir))
    var app = IoC.create('app')
    return app
  }
}
