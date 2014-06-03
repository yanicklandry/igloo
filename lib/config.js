
// # config

exports = module.exports = function() {

  return {
    defaults: {
      server: {
        host: 'localhost',
        clusterEnabled: true
      },
      cookieParser: '',
      mongo: {
        host: 'localhost',
        port: 27017,
        opts: {},
        // faster - don't perform 2nd request to verify
        // log message was received/saved
        safe: false
      },
      redis: {
        host: 'localhost',
        port: 6379,
        maxAge: 24 * 60 * 60 * 1000
      },
      output: {
        handleExceptions: true,
        colorize: true,
        prettyPrint: true,
        level: 'info'
      },
      logger: {
        'console': true,
        mongo: false,
        file: false,
      }
    },
    development: {
      server: {
        env: 'development',
        port: 3000,
      },
      mongo: {
        db: 'igloo-development',
      },
      redis: {
        prefix: 'igloo-development'
      }
    },
    production: {
      server: {
        env: 'production',
        port: 80,
      },
      mongo: {
        db: 'igloo-production',
      },
      redis: {
        prefix: 'igloo-production'
      },
      output: {
        handleExceptions: false,
        prettyPrint: false,
        colorize: false
      },
      logger: {
        'console': false,
        mongo: true,
        // <https://github.com/flatiron/winston#file-transport>
        file: {
          filename: '/var/log/igloo.log',
          // TODO: maxsize
          // TODO: maxFiles
          timestamp: true
        }
      }
    }
  }

}

exports['@singleton'] = true
