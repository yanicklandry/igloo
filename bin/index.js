#!/usr/bin/env node

// # bin

var chalk = require('chalk')
var program = require('commander')
var pkg = require('../package.json')
var logger = require('../lib/logger')

logger.info('igloo v' + pkg.version + ' (see --help)')

program.version(pkg.version)

program
  .command('create')
  .description('create a new igloo')
  .action(function() {
    logger.error('creating a new igloo (todo)')
  })

program.parse(process.argv)


