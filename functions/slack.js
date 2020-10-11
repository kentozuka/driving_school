const { WebClient, ErrorCode } = require('@slack/web-api')
const logger = require('./logger')
require('dotenv').config()
const web = new WebClient(process.env.SLACK_TOKEN)

module.exports = async (text) => {
  const params = {
    channel: '#driving-school',
    username: '109 hunter',
    text
  }
  try {
    await web.chat.postMessage(params)
  } catch (error) {
    // Check the code property, and when its a PlatformError, log the whole response.
    if (error.code === ErrorCode.PlatformError) {
      logger(error.data)
    } else {
      // Some other error, oh no!
      logger('Well, that was unexpected.')
    }
  }
}
