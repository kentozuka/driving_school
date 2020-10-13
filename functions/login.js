const data = require('../constants')
const selectors = require('../selectors')
const logger = require('./logger')
const slack = require('./slack')
require('dotenv').config()

module.exports = async (page) => {
  const sel = selectors.login
  const button = await page.$(sel.button)
  const timeout = await page.$(selectors.timeout.form)

  // if theres no button that means its already logged in
  if (!button) return

  // if theres a timeout page shown then click the button
  if (timeout) {
    Promise.all([
      page.click(selectors.timeout.button),
      page.waitForNavigation()
    ])
  }

  try {
    await page.type(sel.id, process.env.ID)
    await page.type(sel.password, process.env.PASSWORD)
    await Promise.all([
      page.waitForNavigation(),
      page.click(sel.button)
    ])
    await page.waitForSelector(sel.waiter)
  } catch (e) {
    await slack('Coudn\'t sign in to the system. Shutting down.')
    logger('Error trying to sign in to the system. ' + e, 'error')
    process.exit()
  }
}
