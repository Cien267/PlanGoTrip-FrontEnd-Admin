import axios from 'axios'
import type { AxiosInstance } from 'axios'

const timeout = 20000
const baseUrl = import.meta.env.VITE_BASE_URL

/**
 * Creates an Axios instance with preconfigured settings for API requests.
 * @type {AxiosInstance}
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: timeout,
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('PlanGoTrip API Error:', error)
    return Promise.reject(error)
  },
)

export default apiClient
