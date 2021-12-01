const pino = require('pino')({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

module.exports = pino
