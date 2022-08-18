
import Airtable from 'airtable'
import nodemailer from 'nodemailer'

export function sendEmail({ emails, html, subject }) {
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
      to,
      ...(cc?.length) && { cc: cc.join(',') },
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

export function getEmailList() {
  return new Promise((resolve, reject) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')
    base('Boys').select({
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
