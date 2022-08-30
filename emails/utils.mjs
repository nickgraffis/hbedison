
import Airtable from 'airtable'
import nodemailer from 'nodemailer'

export function sendEmail({ emails, html, subject, bcc }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: '587',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    })
    const [to, ...cc] = emails?.split(',')
    const mailOptions = {
      from: 'ngraffis@hbuhsd.edu',
      to: bcc ? 'ngraffis@hbuhsd.edu' : to,
      ...(cc?.length) && { cc: cc.join(',') },
      ...(bcc) && { bcc: emails },
      subject,
      html,
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if (err)
        reject(err)

      else
        resolve(info)
    })
  })
}

export function getEmailList(filter) {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys').select({
      // Selecting the first 3 records in Grid view:
      ...(filter) && { filterByFormula: filter },
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

// class AirTable {
//   constructor(airTable, tableName) {
//     this.airTable = airTable
//     this.tableName = tableName
//   }

//   base(baseId) {
//     this.#base = baseId
//     return this
//   }

//   table(tableName) {
//     this.#table = tableName
//     return this
//   }

//   where(field, operator, value) {
//     this.#where = [...this.#where || [], { field, operator, value }]
//     return this
//   }

//   firstPage(callback) {
//     this.#firstPage = callback
//     return this
//   }

//   select(options) {
//     this.#select = options
//     return this
//   }

//   async get() {
//     const base = this.#base
//     const table = this.#table
//     const where = this.#where
//     const select = this.#select
//     const firstPage = this.#firstPage
//     const records = await this.airTable.base(base).table(table).select(select).where(where).firstPage()
//     return records
//   }
// }

// and &
// gt, lt, gte, lte, eq, noteq
// AND, BLANK, ERROR, FALSE

// and() adds an AND inbetween mutiple where clauses
// or() adds an OR inbetween mutiple where clauses
// not() makes everything inside of a function not
// eq() is equal to
