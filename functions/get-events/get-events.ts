// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import Airtable from 'airtable'
import { nanoid } from 'nanoid'

const getRecords = async() => {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Table 1').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 100,
      view: 'Grid view',
    }).firstPage((err, records) => {
      // records is an array of records
      if (err) {
        console.error(err)
        reject(err)
      }
      const events = []
      records.forEach((record) => {
        events.push({
          ...record.fields,
          id: record.id,
        })
      })

      resolve(events)
    })
  })
}

const handleReoccuringEvents = (events) => {
  const reoccuringEvents = []
  for (let i = 0; i < events.length; i++) {
    if (events[i].isReoccuring) {
      // console.log(events[i])
      let start = new Date(events[i].date)
      const end = new Date(events[i].endOccurance)
      // console.log(start, end)
      while (start < end) {
        // console.log('go again ? ', start < end)
        // console.log('start/end', start, end)
        // console.log('why are you skipping me?')
        // console.log('dayofweek', start.getDay(), events[i]?.['M-startTime'])
        // console.log('why are you skipping me 2?')
        const skippedDates = JSON.parse(events[i]?.skippedDates || '[]')
        console.log(skippedDates, start.toISOString().split('T')[0])
        const thisdate = start.toISOString().split('T')[0]
        if (start.getDay() === 0 && events[i]?.['M-startTime'] && !skippedDates.includes(thisdate)) {
          reoccuringEvents.push({
            ...events[i],
            date: start.toISOString().split('T')[0],
            startTime: events[i]?.['M-startTime'],
            endTime: events[i]?.['M-endTime'],
            uuid: nanoid(),
          })
        }
        else if (start.getDay() === 1 && events[i]?.['T-startTime'] && !skippedDates.includes(thisdate)) {
          reoccuringEvents.push({
            ...events[i],
            date: start.toISOString().split('T')[0],
            startTime: events[i]?.['T-startTime'],
            endTime: events[i]?.['T-endTime'],
            uuid: nanoid(),
          })
        }
        else if (start.getDay() === 2 && events[i]?.['W-startTime'] && !skippedDates.includes(thisdate)) {
          reoccuringEvents.push({
            ...events[i],
            date: start.toISOString().split('T')[0],
            startTime: events[i]?.['W-startTime'],
            endTime: events[i]?.['W-endTime'],
            uuid: nanoid(),
          })
        }
        else if (start.getDay() === 3 && events[i]?.['Th-startTime'] && !skippedDates.includes(thisdate)) {
          reoccuringEvents.push({
            ...events[i],
            date: start.toISOString().split('T')[0],
            startTime: events[i]?.['Th-startTime'],
            endTime: events[i]?.['Th-endTime'],
            uuid: nanoid(),
          })
        }
        else if (start.getDay() === 4 && events[i]?.['Fri-startTime'] && !skippedDates.includes(thisdate)) {
          reoccuringEvents.push({
            ...events[i],
            date: start.toISOString().split('T')[0],
            startTime: events[i]?.['Fri-startTime'],
            endTime: events[i]?.['Fri-endTime'],
            uuid: nanoid(),
          })
        }
        else if (start.getDay() === 5 && events[i]?.['Sat-startTime'] && !skippedDates.includes(thisdate)) {
          reoccuringEvents.push({
            ...events[i],
            date: start.toISOString().split('T')[0],
            startTime: events[i]?.['Sat-startTime'],
            endTime: events[i]?.['Sat-endTime'],
            uuid: nanoid(),
          })
        }
        start = new Date(start.setDate(start.getDate() + 1))
        // console.log('end start/end', start, end)
      }
    }
  }

  return reoccuringEvents
}

const handler = async(event) => {
  let events
  try {
    events = await getRecords()
    // console.log(events)
  }
  catch (error) {
    return { statusCode: 500, body: error.toString() }
  }

  const reoccuringEvents = handleReoccuringEvents(events)
  // console.log(reoccuringEvents)
  const returnEvents = [
    ...events.filter(event => !event.isReoccuring),
    ...reoccuringEvents,
  ]
  return {
    statusCode: 200,
    body: JSON.stringify(returnEvents),
  }
}

module.exports = { handler }
