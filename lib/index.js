
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

module.exports = function(id) {
  return require(path.join(__dirname, 'boot', id))
}
