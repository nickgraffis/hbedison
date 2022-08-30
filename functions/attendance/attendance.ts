import { Handler } from '@netlify/functions'
import Airtable from 'airtable'

function getAthletes() {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys').select({
      maxRecords: 100,
      view: 'Grid view',
    }).firstPage((err, records) => {
      // records is an array of records
      if (err || !records) {
        console.error(err)
        reject(err)
        return
      }
      const athletes: { [key: string]: string }[] = []
      records.forEach((record) => {
        athletes.push({
          ...record.fields,
          id: record.id,
        })
      })

      resolve(athletes)
    })
  })
}

function getAttendance() {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys_Attendance').select({
      maxRecords: 100,
      view: 'Grid view',
    }).firstPage((err, records) => {
      // records is an array of records
      if (err || !records) {
        console.error(err)
        reject(err)
        return
      }
      const athletes: { [key: string]: string }[] = []
      records.forEach((record) => {
        athletes.push({
          ...record.fields,
          id: record.id,
        })
      })

      resolve(athletes)
    })
  })
}

async function createByRef(ref: string) {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys_Attendance').create([
      {
        fields: {
          ref,
        },
      },
    ], (err, records) => {
      if (err || !records) {
        console.error(err)
        reject(err)
        return
      }
      resolve(records[0].getId())
    })
  })
}

async function createOrFindRef(ref: string): Promise<{ id: string; ref: string; data: string }> {
  console.log(ref)
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys_Attendance').select({
      filterByFormula: `ref='${ref}'`,
      maxRecords: 1,
      view: 'Grid view',
    }).firstPage(async(err, _records) => {
      // records is an array of records
      if (err) {
        console.error(err)
        reject(err)
      }
      let records: any = _records
      console.log('RECORDS', records)
      if (!records?.length) {
        const newId = await createByRef(ref)
        records = [
          {
            id: newId,
            fields: {},
          },
        ]
      }

      resolve({
        ...records[0]?.fields || {},
        id: records[0]?.id,
      })
    })
  })
}

enum Attendance {
  Absent = 'Absent',
  Present = 'Present',
  Late = 'Late',
  Excused = 'Excused',
  Unknow = 'Unknow',
}

async function createOrUpdateDateColumn(ref: string, date: string, attendance: Attendance) {
  const record = await createOrFindRef(ref)
  let data: any
  if (!record.data)
    data = {}
  else
    data = JSON.parse(record.data)

  data[date] = attendance || Attendance.Unknow
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys_Attendance').update([
      {
        id: ref,
        fields: {
          data: JSON.stringify(data),
        },
      },
    ], (err) => {
      if (err) {
        console.error(err)
        reject(err)
        return
      }
      resolve(true)
    })
  })
}

const handler: Handler = async(event) => {
  const [, , , , id] = event.path.split('/')
  console.log(id)
  const method = event.httpMethod
  if (method === 'GET') {
    try {
      const athletes = await getAthletes()
      console.log(athletes)
      const ids = athletes.map(athlete => athlete.id)
      const attendance = await getAttendance()
      console.log(attendance)
      const attendanceParse = []
      for (let i = 0; i < athletes.length; i++) {
        let athleteAttendance = attendance.find(att => att.ref === athletes[i].id)
        console.log(athleteAttendance)
        if (!athleteAttendance) {
          console.log(athletes[i].id)
          const _athleteAttendance = await createOrFindRef(athletes[i].id)
          athleteAttendance = {
            ..._athleteAttendance,
            data: {},
          }
        }

        const __attendanceData = athleteAttendance?.data || {}
        const today = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`
        if (!__attendanceData?.[today]) __attendanceData[today] = Attendance.Unknow
        attendanceParse.push({
          Name: athletes[i].Name,
          Team: athletes[i].Team,
          attendance: __attendanceData,
        })
      }
      console.log(athletes)

      return {
        statusCode: 200,
        body: JSON.stringify(attendanceParse),
      }
    }
    catch (error) {
      console.log(error)
      return { statusCode: 500, body: error.toString() }
    }
  }
  else if (method === 'POST') {
    try {

      // return {
      //   statusCode: 200,
      //   body: JSON.stringify(returnUser),
      // }
    }
    catch (error) {
      console.log(error)
      return { statusCode: 500, body: error.toString() }
    }
  }
}

module.exports = { handler }
