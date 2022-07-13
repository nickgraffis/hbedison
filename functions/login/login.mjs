// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import { nanoid } from 'nanoid'
const Airtable = require('airtable')

const findPreviousLogin = async(ip) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')

  return new Promise((resolve, reject) => {
    const oldRecords = base('JSWT').select({
      filterByFormula: `ip = "${ip}"`,
    }).firstPage((err, records) => {
      if (err) {
        console.error(err)
        reject(err)
      }

      const previousLogins = []
      records.forEach((record) => {
        console.log('Retrieved', record)
        previousLogins.push({ ...record.fields, id: record.id })
      })

      resolve(previousLogins.length ? previousLogins[0] : null)
    })
  })
}

export const handler = async(event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
    const { username, password } = JSON.parse(event.body)
    console.log(process.env.AIRTABLE_API_KEY)
    if (username !== 'nickgraffis' && password !== '4185942Nickjane9195$') return { statusCode: 401, body: 'Unauthorized' }
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    const ip = event.headers['client-ip']
    const prev = await findPreviousLogin(ip)
    console.log(prev)
    if (prev) {
      await base('JSWT').update([
        {
          id: prev.id,
          fields: {
            ip: prev.ip,
            expiry: prev.expiry,
            code: prev.code,
            lastLogin: prev.lastLogin,
            status: 'deactivated',
          },
        },
      ])
    }
    const token = {
      code: nanoid(),
      ip,
      expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      status: 'active',
      lastLogin: new Date().toISOString(),
    }
    await base('JSWT').create(token)
    return {
      statusCode: 200,
      body: JSON.stringify(token),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  }
  catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }
}
