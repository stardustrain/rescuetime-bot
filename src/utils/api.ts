import axios from 'axios'
import { camelizeKeys } from 'humps'

const API_END_POINT = 'https://www.rescuetime.com/anapi'
const RESCUE_TIME_API_KEY = process.env.RESCUE_TIME_API_KEY

const instance = axios.create({
  baseURL: API_END_POINT,
  transformResponse: (data) => camelizeKeys(JSON.parse(data)),
})

export const generateUrl = (url: string) => (
  `${url}?key=${RESCUE_TIME_API_KEY}`
)

export const request = async <T>(url: string) => (
  instance.get<T>(url)
)

export const requestAll = async (urls: string[]) => {
  const res = await axios.all(urls.map((url) => instance.get(url)))

  return res.map(r => r.data)
}
