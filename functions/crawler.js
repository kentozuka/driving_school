const slack = require('./slack')
const login = require('./login')
const analyzer = require('./analyzer')
const next = require('./next')
const constants = require('../constants')
// const gd = require('./calendar')

module.exports = async (page) => {
  // puts in a promise hell
  await new Promise(() => {
    setInterval(() => {
      crawl(page)
    }, constants.interval)
  })
}

async function crawl (page) {
  // login if needed
  await login(page)
  // const gcdt = await gd()
  let candidates = []
  for (let i = 0; i < 3; i++) {
    const items = await analyzer(page)
    candidates = candidates.concat(items)
    await next(page)
  }
  if (candidates.length) await slack(JSON.stringify(candidates))
  await rollback(page)
}

async function rollback (page) {
  Promise.all([
    page.evaluate(() => {
      sendLinkGinou('A', '0', document.getElementById('formId')) // eslint-disable-line
    }),
    page.waitForNavigation()
  ])
}
