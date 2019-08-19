import axios from 'axios'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const baseUrl = IS_DEV
  ? 'http://872b78d4.ngrok.io'
  : 'http://localhost:7000'

export const placeholder = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

export default axios.create({
  baseURL: baseUrl
})
