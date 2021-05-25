const Airtable = require('airtable')

const handler = async(event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appSUgTUjToRLm1p2')
    const airtable = await base('Visitors').create(JSON.parse(event.body))
    return {
      statusCode: 200,
      body: 'thanks!',
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  }
  catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
