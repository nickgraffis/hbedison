import fs from 'fs'
import dotenv from 'dotenv'
import { parse } from 'marked'
import { sendEmail, getEmailList } from './utils.mjs'
dotenv.config()
// Step 1:
// Read the template from the fs
const template = fs.readFileSync(`./emails/templates/${process.argv[2]}.md`, 'utf8')
// Step 2:
// Get the accounts from airtable
const accounts = await getEmailList()
// Step 3:
// Replace anything inside the {{ }}
for (let a = 0; a < accounts.length; a++) {
  const account = accounts[a]
  // find all the places where there is {{ anything }}
  const js = template.match(/(?<js>{{(.)*?}})/g)
  let _template = template
  for (let i = 0; i < js.length; i++) {
    const j = js[i]
    const context = account
    const evaluatedValue = eval(j)
    // replace
    _template = _template.replace(j, evaluatedValue)
    if (a === 0) console.log(_template)
    if (a === 0) fs.writeFileSync(`./emails/test/${context.Name}.html`, parse(_template))
  }

  // Step 4:
  // Convert the markdown files to HTML
  // const html = await markdownToHTML(_tempalte)
  // Step 5:
  // Send an email with nodemailer
  // await sendEmail(account.email, html)
}
