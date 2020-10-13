module.exports = async (page) => {
  await Promise.all([
    page.waitForNavigation(),
    page.evaluate(() => {
      // goes to next page
      sendLink('N', document.getElementById('formId')) // eslint-disable-line
    })
  ])
}
