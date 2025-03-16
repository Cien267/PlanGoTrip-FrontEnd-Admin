import axios from 'axios'
import type { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'

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
    if (error.response && error.response.status === 401) {
      const router = useRouter()
      router.push({ name: ROUTER_NAME_LIST.LOGIN_PAGE })
    }
    return Promise.reject(error)
  },
)

export default apiClient
