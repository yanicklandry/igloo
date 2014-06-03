
// # Igloo

var path = require('path')
var IoC = require('electrolyte')
var os = require('os')
var cluster = require('cluster')

IoC.loader(IoC.node(path.join(__dirname, 'lib')))

//
// Inspired by `bixby-express` and Jared Hanson
//

var logger = IoC.create('logger')
var settings = IoC.create('settings')
var app = IoC.create('app')

exports = module.exports = app

if (cluster.isMaster && settings.server.clusterEnabled) {

  var clusterSize = settings.server.clusterSize || os.cpus().length

  logger.info('creating cluster with %d workers', clusterSize)

  for (var i=0; i<clusterSize; i++) {
    logger.info('spawning worker #%d', i + 1)
    cluster.fork()
  }

  cluster.on('fork', function(worker) {
    logger.info('worker #%s with pid %d spawned', worker.id, worker.process.pid)
  })

  cluster.on('online', function(worker) {
    logger.info('worker #%s with pid %d online', worker.id, worker.process.pid)
  })

  cluster.on('listening', function(worker, addr) {
    logger.info('worker #%s with pid %d listening on %s:%d', worker.id, worker.process.pid, addr.address, addr.port)
  })

  cluster.on('disconnect', function(worker) {
    logger.info('worker #%s with pid %d disconnected', worker.id, worker.process.pid)
  })

  cluster.on('exit', function(worker, code, signal) {
    logger.error('worker #%s with pid %d exited with code/signal', worker.id, worker.process.pid, signal || code)
    if (worker.suicide) return
    logger.info('worker #%s restarting', worker.id)
    cluster.fork()
  })

} else {

  app.boot(function(err) {

    if (err) {
      logger.error(err)
      process.exit(0)
      return
    }

    logger.info('app booted')

    app.listen(settings.server.port, settings.server.host, function() {
      var addr = this.address()
      logger.info('app listening on %s:%d', addr.address, addr.port)
    })

  })

}
