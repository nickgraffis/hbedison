import fs from 'fs'
import { argv } from 'process'
import dotenv from 'dotenv'
import { parse } from 'marked'
import { nanoid } from 'nanoid'
import * as open from 'open'
import inquirer from 'inquirer'
import { sendEmail, getEmailList } from './utils.mjs'

dotenv.config()
const template = fs.readFileSync(`./emails/templates/${process.argv[2]}.md`, 'utf8')
// Step 2:
// Get the accounts from airtable
const accounts = await getEmailList()
const emailId = nanoid(8)
// Step 3:
// Replace anything inside the {{ }}
for (let a = 0; a < accounts.length; a++) {
  const account = accounts[a]
  // find all the places where there is {{ anything }}
  const js = template.match(/(?<js>{{(.)*?}})/g)
  let _template = template
  const context = account
  for (let i = 0; i < js.length; i++) {
    const j = js[i]
    context.emailId = emailId
    const evaluatedValue = eval(j)
    // replace
    _template = _template.replace(j, evaluatedValue)
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
    await sendEmail({ emails, subject: process.argv[3], html: parse(_template) })
    fs.writeFileSync(`./src/pages/emails-sent/${emailId}-${context.id}.md`, _template)
    console.log('Email sent')
    continue
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

    if (send) {
      await sendEmail(context, _template)
      fs.writeFileSync(`./src/pages/emails-sent/${emailId}-${context.id}.md`, _template)
      console.log('Email sent')
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
