const constants = require('../constants')
const selectors = require('../selectors')

module.exports = async (page) => {
  const holder = []
  const sel = selectors.home
  const dates = await page.$$(sel.date)
  for (const item of dates) {
    const row = await item.$$eval('td', list => list.map(x => { return { cls: x.getAttribute('class'), text: x.innerText.trim() } }))
    holder.push(modify(row))
  }
  return nominate(holder)
}

function modify (data) {
  let counter = 1
  const object = { date: '', data: {} }
  data.forEach(x => {
    if (x.cls === 'view') object.date = dated(x.text)
    else object.data[counter] = x
    counter++
  })
  return object
}

function dated (x) {
  const current = new Date()
  const date = x.split('\n')
  const parsed = date[0].match(/\d+/g)
  return new Date(current.getFullYear(), parsed[0] - 1, parsed[1])
}

function nominate (x) {
  const candidates = []
  x.forEach(el => {
    const date = el.date
    // cant help
    for (const key in el.data) {
      const cls = el.data[key].cls
      if (cls.match(/\d+/)[0] === constants.status) candidates.push({ date, period: key })
    }
  })
  return candidates
}
