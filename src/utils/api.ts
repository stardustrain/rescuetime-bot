import axios from 'axios'
import { camelizeKeys } from 'humps'

const API_END_POINT = 'https://www.rescuetime.com/anapi'
const RESCUE_TIME_API_KEY = process.env.RESCUE_TIME_API_KEY

const instance = axios.create({
  baseURL: API_END_POINT,
  transformResponse: (data) => camelizeKeys(JSON.parse(data))
})

const generateUrl = (url: string) => (
  `${url}?key=${RESCUE_TIME_API_KEY}`
)

export const request = async <T>(url: string) => (
  await instance.get<T>(generateUrl(url))
)
