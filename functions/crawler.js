const login = require('./login')

module.exports = async (page) => {
  await login(page)
}
