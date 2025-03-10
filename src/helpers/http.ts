import axios from 'axios'
import type { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'

const timeout = 20000
const baseUrl = import.meta.env.VITE_BASE_URL
const COOKIES_TOKEN_NAME = 'plangotrip-user-token'

/**
 * Creates an Axios instance with preconfigured settings for API requests.
 * @type {AxiosInstance}
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
})

apiClient.interceptors.request.use(
  config => {
    const token = Cookies.get(COOKIES_TOKEN_NAME)
    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('PlanGoTrip API Error:', error)
    return Promise.reject(error)
  },
)

export default apiClient
