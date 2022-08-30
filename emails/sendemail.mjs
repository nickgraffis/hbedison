import fs from 'fs'
import dotenv from 'dotenv'
import { parse } from 'marked'
import { nanoid } from 'nanoid'
import * as open from 'open'
import inquirer from 'inquirer'
import { sendEmail, getEmailList } from './utils.mjs'
// process.argv[2] is the path to the markdown file
// process.argv[3] is the subject of the email (add in quotes)
// need to add a way to filter based on a field inside airtable
// need attendance. should be easy to click someone, can't change the day, just the team
// need to also be able to have whittmore check attendance, he should be able to go to a certain day
// he will just get everyone who was marked as absent
// send mass email with bcc

dotenv.config()
const template = fs.readFileSync(`./emails/templates/${process.argv[2]}.md`, 'utf8')
// Step 2:
// Get the accounts from airtable
let accounts = process.argv.includes('--filter') ? await getEmailList(`${process.argv.join(' ').split('--filter')?.[1]}`) : await getEmailList()
if (process.argv.includes('--all')) {
  accounts = [{
    AthleteEmails: accounts.map(a => a.AthleteEmails).map(email => email?.replace('\n', '')?.trim()).filter(Boolean).join(','),
    ParentEmails: accounts.map(a => a.ParentEmails).map(email => email?.replace('\n', '')?.trim()).filter(Boolean).join(','),
  }]
}

console.log('ACCOUNTS:', accounts)

const emailId = nanoid(8)
// Step 3:
// Replace anything inside the {{ }}
for (let a = 0; a < accounts.length; a++) {
  const account = accounts[a]
  // find all the places where there is {{ anything }}
  const js = template.match(/(?<js>{{(.)*?}})/g)
  let _template = template
  const context = account
  if (js?.length) {
    for (let i = 0; i < js.length; i++) {
      const j = js[i]
      context.emailId = emailId
      const evaluatedValue = eval(j)
      // replace
      _template = _template.replace(j, evaluatedValue)
    }
  }

  console.log(`Writing email to ${context?.Name}`)
  console.log(context)
  const { preview } = await inquirer.prompt([{
    type: 'confirm',
    name: 'preview',
    message: 'Preview email?',
    default: true,
  }])
  const emails = context.AthleteEmails + (context?.ParentEmails ? `, ${context.ParentEmails}` : '')
  if (!preview) {
    const { send } = await inquirer.prompt([{
      type: 'confirm',
      name: 'send',
      message: 'Send email?',
      default: true,
    }])
    if (send) {
      await sendEmail({ emails, subject: process.argv[3], html: parse(_template), bcc: process.argv.includes('--all') })
      fs.writeFileSync(`./src/pages/emails-sent/${emailId}-${context.id}.md`, _template)
      console.log('Email sent')
      continue
    }
    else {
      continue
    }
  }
  else {
    fs.writeFileSync(`./emails/stage/${context.id}.html`, parse(_template))
    open.default(`./emails/stage/${context.id}.html`)
    const { send } = await inquirer.prompt([{
      type: 'confirm',
      name: 'send',
      message: 'Send email?',
      default: true,
    }])
    fs.unlinkSync(`./emails/stage/${context.id}.html`)
    if (send) {
      await sendEmail({ emails, subject: process.argv[3], html: parse(_template), bcc: process.argv.includes('--all') })
      fs.writeFileSync(`./src/pages/emails-sent/${emailId}-${context.id}.md`, _template)
      console.log('Email sent')
      continue
    }
    else {
      continue
    }
  }
  // Step 4:
  // Convert the markdown files to HTML
  // const html = await markdownToHTML(_tempalte)
  // Step 5:
  // Send an email with nodemailer
  // await sendEmail(account.email, html)
}
