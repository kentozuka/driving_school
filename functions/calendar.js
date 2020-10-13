const fs = require('fs').promises
const readline = require('readline')
const { google } = require('googleapis')
const logger = require('./logger')

// base path
const base = 'keys/'
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const CREDENTIAL_PATH = base + 'credentials.json'
const TOKEN_PATH = base + 'token.json'

module.exports = async () => {
  try {
    const credentials = await fs.readFile(CREDENTIAL_PATH, 'utf8')
    const oAuth2Client = await authorize(JSON.parse(credentials))
    const raw = await list(oAuth2Client)
    if (raw.length) return modify(raw)
    return []
  } catch (e) {
    logger('failed to read data from google calendar. ' + e, 'error')
    return []
  }
}

async function authorize (credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.installed // eslint-disable-line
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
  let token = await fs.readFile(TOKEN_PATH, 'utf8')
  // prob never happens so ill leave it as is (added await though it has no effect)
  if (!token) token = await getAccessToken(oAuth2Client)
  oAuth2Client.setCredentials(JSON.parse(token))
  return oAuth2Client
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken (oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close()
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err)
      oAuth2Client.setCredentials(token)
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err)
        console.log('Token stored to', TOKEN_PATH)
      })
    })
  })
}

async function list (auth) {
  const options = {
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 30,
    singleEvents: true,
    orderBy: 'startTime'
  }
  const calendar = google.calendar({ version: 'v3', auth })
  const events = await calendar.events.list(options)
  if (events) return events.data.items
  return []
}

function modify (data) {
  return data.map(x => { return { title: x.summary, start: x.start.dateTime, end: x.end.dateTime } })
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
// function listEvents (auth) {
//   const calendar = google.calendar({ version: 'v3', auth })
//   calendar.events.list({
//     calendarId: 'primary',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime'
//   }, (err, res) => {
//     if (err) return logger('The API returned an error: ' + err, 'error')
//     const events = res.data.items
//     if (events.length) {
//       console.log('Upcoming 10 events:')
//       events.map((event, i) => {
//         const start = event.start.dateTime || event.start.date
//         console.log(`${start} - ${event.summary}`)
//       })
//     } else {
//       logger('No upcoming events found.')
//     }
//   })
// }
