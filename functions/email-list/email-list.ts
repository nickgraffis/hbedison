// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import { Handler } from '@netlify/functions'
import Airtable from 'airtable'
import { nanoid } from 'nanoid'

const cleanUpCommas = (stringOfEmails: string) => {
  const arrayOfEmails = stringOfEmails?.split(',')
  const cleanedUpArray = arrayOfEmails.filter(Boolean).map(email => email.trim())
  return cleanedUpArray.join(',')
}

const getRecords = async(id: string) => {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys').find(id, (err, record) => {
      if (err) reject(err)
      resolve(record?._rawJson)
    })
  })
}

const updateEmails = async(id: string, athleteEmails: string, parentEmails: string) => {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys').update([{
      id,
      fields: {
        AthleteEmails: athleteEmails,
        ParentEmails: parentEmails,
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
  else if (method === 'POST') {
    try {
      const { isAthlete, emails } = JSON.parse(event.body)
      console.log(isAthlete, emails)
      const user = await getRecords(id)
      let AthleteEmails = user?.fields.AthleteEmails || ''
      let ParentEmails = user?.fields.ParentEmails || ''
      if (isAthlete)
        AthleteEmails = `${user?.fields?.AthleteEmails || ''}${user?.fields?.AthleteEmails ? `, ${emails}` : emails}`
      else
        ParentEmails = `${user?.fields?.ParentEmails || ''}${user?.fields?.ParentEmails ? `, ${emails}` : emails}`
      console.log(AthleteEmails, ParentEmails)
      await updateEmails(id, cleanUpCommas(AthleteEmails), cleanUpCommas(ParentEmails))
      const returnUser = await getRecords(id)
      return {
        statusCode: 200,
        body: JSON.stringify(returnUser),
      }
    }
    catch (error) {
      console.log(error)
      return { statusCode: 500, body: error.toString() }
    }
  }
  else if (method === 'DELETE') {
    try {
      const { email } = JSON.parse(event.body)
      const user = await getRecords(id)
      let AthleteEmails = user?.fields.AthleteEmails || ''
      let ParentEmails = user?.fields.ParentEmails || ''
      console.log(AthleteEmails, ParentEmails)
      AthleteEmails = AthleteEmails.replace(email, '')
      ParentEmails = ParentEmails.replace(email, '')
      await updateEmails(id, cleanUpCommas(AthleteEmails), cleanUpCommas(ParentEmails))
      const returnUser = await getRecords(id)
      return {
        statusCode: 200,
        body: JSON.stringify(returnUser),
      }
    }
    catch (err) {
      console.log(err)
      return { statusCode: 500, body: err.toString() }
    }
  }
  else if (method === 'PUT') {
    try {
      const { isAthlete, email } = JSON.parse(event.body)
      const user = await getRecords(id)
      let AthleteEmails = user?.fields.AthleteEmails || ''
      let ParentEmails = user?.fields.ParentEmails || ''
      console.log(isAthlete, email)
      if (isAthlete) {
        AthleteEmails = `${AthleteEmails}${AthleteEmails ? `, ${email}` : email}`
        ParentEmails = ParentEmails.replace(email, '')
      }
      else {
        AthleteEmails = AthleteEmails.replace(email, '')
        ParentEmails = `${ParentEmails}${ParentEmails ? `, ${email}` : email}`
      }
      console.log(AthleteEmails, ParentEmails)
      await updateEmails(id, cleanUpCommas(AthleteEmails), cleanUpCommas(ParentEmails))

      const returnUser = await getRecords(id)

      return {
        statusCode: 200,
        body: JSON.stringify(returnUser),
      }
    }
    catch (err) {
      console.log(err)
      return { statusCode: 500, body: err.toString() }
    }
  }
}

module.exports = { handler }
