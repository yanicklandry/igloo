
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
        port: '27017',
        opts: {}
      },
      redis: {
        host: 'localhost',
        port: 6379,
        maxAge: 24 * 60 * 60 * 1000
      }
    },
    development: {
      server: {
        env: 'development',
        port: 3000,
      },
      mongo: {
        dbname: 'igloo-development',
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
        dbname: 'igloo-production',
      },
      redis: {
        prefix: 'igloo-production'
      }
    }
  }

}

exports['@singleton'] = true
