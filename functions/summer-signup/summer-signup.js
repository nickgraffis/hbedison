// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const Airtable = require('airtable')

const handler = async(event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
    console.log(JSON.parse(event.body))
    console.log(process.env.AIRTABLE_API_KEY)
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('appSAUt9kM39XgrA1')
    await base('Summer Sign Ups').create(JSON.parse(event.body))
    return {
      statusCode: 200,
      body: 'thanks!',
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

module.exports = { handler }
