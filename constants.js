module.exports = {
  launchOptions: {
    headless: false
  },
  viewport: {
    width: 1000,
    height: 800
  },
  top: 'https://www.e-license.jp/el25/?abc=jqUVluUZJZA%2BbrGQYS%2B1OA%3D%3D',
  timetable: {
    1: { start: '9:00', end: '9:50' },
    2: { start: '10:00', end: '10:50' },
    3: { start: '11:00', end: '11:50' },
    4: { start: '12:00', end: '12:50' },
    5: { start: '13:00', end: '13:50' },
    6: { start: '14:00', end: '14:50' },
    7: { start: '15:00', end: '15:50' },
    8: { start: '16:00', end: '16:50' },
    9: { start: '17:00', end: '17:50' },
    10: { start: '18:10', end: '19:00' },
    11: { start: '19:10', end: '20:00' },
    12: { start: '20:10', end: '21:00' }
  },
  status: '1', // 0 = emptry, 1 = can reserve, 8 = past, 7 = current, 9 = blank
  interval: 60 * 1000,
  db: 'https://script.google.com/macros/s/AKfycbxJ-Hx6QUz5csSoN7CxxNdQg2l-OnTb9DASJVJFBOnDumZuVTs/exec'
}
