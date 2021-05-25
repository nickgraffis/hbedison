// string.js slugify drops non ascii chars so we have to
// use a custom implementation here
import { remove } from 'diacritics'
export * from './dark'

export function formatDate(string: string | Date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  const date = new Date(string)
  const ellapsed = (Date.now() / 1000) - (date.getTime() / 1000)
  if (ellapsed < 604800) {
    if (ellapsed < 3600)
      return `${Math.floor(ellapsed / 60)} minutes ago`

    else if (ellapsed < 86400)
      return `${Math.floor(ellapsed / 3600)} hours ago`

    else if (ellapsed < 60)
      return 'a few seconds ago'

    else
      return days[date.getDay()]
  }
  else if (ellapsed < 3154000) {
    return `${months[date.getMonth()]} ${date.getDate()}`
  }
  else {
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear().toString()}`
  }
}

// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001F]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

export const slugify = (str: string): string => {
  return (
    remove(str)
      // Remove control characters
      .replace(rControl, '')
      // Replace special characters
      .replace(rSpecial, '-')
      // Remove continuos separators
      .replace(/-{2,}/g, '-')
      // Remove prefixing and trailing separtors
      .replace(/^-+|-+$/g, '')
      // ensure it doesn't start with a number (#121)
      .replace(/^(\d)/, '_$1')
      // lowercase
      .toLowerCase()
  )
}
