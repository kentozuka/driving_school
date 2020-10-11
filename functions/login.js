const selectors = require('../selectors')
require('dotenv').config()

module.exports = async (page) => {
  const selections = selectors.login
  await page.type(selections.id, process.env.ID)
  await page.type(selections.password, process.env.PASSWORD)
  await Promise.all([
    page.waitForNavigation(),
    page.click(selections.button)
  ])
}
