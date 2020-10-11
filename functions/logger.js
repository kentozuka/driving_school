const log4js = require('log4js')
const options = require('../logs/config.json')

log4js.configure(options)
const logger = log4js.getLogger('app')

module.exports = (body, type = null) => {
  if (!type) {
    logger.info(body)
  } else if (type === 'error') {
    logger.error(body)
  } else {
    logger.warn(body)
  }
}
