import { isAuthenticated } from 'server.logic'

export const handler = async(event) => {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
    const { token } = JSON.parse(event.body)
    const ip = event.headers['client-ip']
    const isAuth = await isAuthenticated(token, ip)
    return {
      statusCode: 200,
      body: JSON.stringify(isAuth),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  }
  catch (error) {
    console.log(error)
    return { statusCode: 500, body: error.toString() }
  }
}
