const puppeteer = require('puppeteer')
const crawler = require('./crawler')

const constants = {
  top: 'https://www.e-license.jp/el25/?abc=jqUVluUZJZA%2BbrGQYS%2B1OA%3D%3D',
  login: {
    id: '11153',
    password: '5dHlx4haPDUI9MV'
  }
};

(async () => {
  // creating a new instance
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(constants.top)
  await crawler(constants.login)
  await browser.close()
})()
