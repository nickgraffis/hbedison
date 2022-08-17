// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import { Handler } from '@netlify/functions'
import Airtable from 'airtable'
import { nanoid } from 'nanoid'

const getRecords = async(id: string) => {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys').find(id, (err, record) => {
      if (err) reject(err)
      resolve(record?._rawJson)
    })
  })
}

const updateShirtSize = async(id: string, size: string) => {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys').update([{
      id,
      fields: {
        ShirtSize: size,
      },
    }], (err, record) => {
      if (err) reject(err)
      resolve(record)
    })
  })
}

const handler: Handler = async(event) => {
  let user
  const [, , , , id] = event.path.split('/')
  console.log(id)
  const method = event.httpMethod
  if (method === 'GET') {
    try {
      user = await getRecords(id)
      console.log(user)

      return {
        statusCode: 200,
        body: JSON.stringify(user),
      }
    }
    catch (error) {
      console.log(error)
      return { statusCode: 500, body: error.toString() }
    }
  }
  else {
    try {
      const shirtSize = JSON.parse(event.body || '{ "size": "L" }').size
      await updateShirtSize(id, shirtSize)
      const user = await getRecords(id)
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      }
    }
    catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
  }
}

module.exports = { handler }
