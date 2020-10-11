const puppeteer = require('puppeteer')
const data = require('./constants')
const crawler = require('./functions/crawler');

(async () => {
  // creating a new instance
  const browser = await puppeteer.launch(data.launchOptions)
  const page = await browser.newPage()
  await page.goto(data.top)
  await crawler(page)
  await browser.close()
})()
