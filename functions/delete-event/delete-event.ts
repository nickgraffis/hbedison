import Airtable from 'airtable'
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')

export const handler = async(event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
    // segments
    const segments = event.path.split('/')
    const id = segments[segments.length - 1]
    const date = JSON.parse(event.body)?.date
    const e = await base('Table 1').find(id)
    if (e.fields.isReoccuring) {
      // @ts-ignore
      let skippedDates = e.fields.skippedDates ? JSON.parse(e.fields.skippedDates || '[]') : []
      skippedDates = [...skippedDates, date]
      await base('Table 1').update([{
        id,
        fields: {
          skippedDates: JSON.stringify(skippedDates),
        },
      }])
    }
    else {
      await base('Table 1').destroy([id])
    }
    return {
      statusCode: 200,
      body: JSON.stringify(true),
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
