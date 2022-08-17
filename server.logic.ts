const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app3MsHdgqtfhm89e')

const findTokenRecord = async(token, ip) => {
  return new Promise((resolve, reject) => {
    const oldRecords = base('JSWT').select({
      filterByFormula: `code = "${token}"`,
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

const findPreviousLogin = async(ip, code) => {
  return new Promise((resolve, reject) => {
    const oldRecords = base('JSWT').select({
      filterByFormula: `AND(ip = "${ip}", status = "active", code != "${code}")`,
    }).firstPage((err, records) => {
      if (err) {
        console.error(err)
        reject(err)
      }

      const previousLogins = []
      records?.forEach((record) => {
        console.log('Retrieved', record)
        previousLogins.push({ ...record.fields, id: record.id })
      })

      resolve(previousLogins.length ? previousLogins[0] : null)
    })
  })
}

export const isAuthenticated = async(token: string, ip: string): Promise<Boolean> => {
  if (!token) return false
  const record = await findTokenRecord(token, ip)
  if (!record) return false
  if (record.ip !== ip) {
    await base('JSWT').update([{
      id: record.id,
      fields: {
        ip: record.ip,
        lastLogin: record.lastLogin,
        expiry: record.expiry,
        status: 'deactivated',
        code: record.code,
      },
    }])
    return false
  } if (record.status !== 'active') return false
  if (new Date(record.expiry) < new Date()) {
    await base('JSWT').update([{
      id: record.id,
      fields: {
        ip: record.ip,
        lastLogin: record.lastLogin,
        expiry: record.expiry,
        status: 'expired',
        code: record.code,
      },
    }])
    return false
  }

  const previousLogin = await findPreviousLogin(ip, token)
  if (previousLogin) {
    await base('JSWT').update([{
      id: previousLogin.id,
      fields: {
        ip: previousLogin.ip,
        lastLogin: previousLogin.lastLogin,
        expiry: previousLogin.expiry,
        status: 'deactivated',
        code: previousLogin.code,
      },
    }])
  }

  await base('JSWT').update([{
    id: record.id,
    fields: {
      ip: record.ip,
      lastLogin: new Date().toISOString(),
      expiry: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      status: 'active',
      code: record.code,
    },
  }])

  return true
}
