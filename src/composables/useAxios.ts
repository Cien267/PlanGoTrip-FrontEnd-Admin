import { ref, watchEffect } from 'vue'
import type { HttpMethodType } from '@/types'
import { get, post, put, del } from '@/helpers/axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

/**
 * A Vue composable for making HTTP requests with Axios.
 * @param {string} url - The API endpoint URL
 * @param {HttpMethodType} [method='GET'] - The HTTP method to use (GET, POST, PUT, DELETE)
 * @param {any} [payload=null] - The data to send with POST or PUT requests
 * @param {AxiosRequestConfig} [config={}] - Optional Axios request configuration
 * @returns {{ data: Ref<any>, error: Ref<AxiosError|null>, loading: Ref<boolean>, refetch: () => void }}
 */
export const useAxios = (
  url: string,
  method: HttpMethodType = 'GET',
  payload: any = {},
  config: AxiosRequestConfig = {},
) => {
  const data = ref(null)
  const error = ref<AxiosError | null>(null)
  const loading = ref(false)

  const fetchData = async () => {
    data.value = null
    error.value = null
    loading.value = true

    try {
      let response
      switch (method) {
        case 'GET':
          response = await get(url, config)
          break
        case 'POST':
          response = await post(url, payload, config)
          break
        case 'PUT':
          response = await put(url, payload, config)
          break
        case 'DELETE':
          response = await del(url, config)
          break
        default:
          throw new Error(`Unsupported HTTP method: ${method}`)
      }
      data.value = response.data
    } catch (err: any) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  const refetch = () => fetchData()

  return { data, error, loading, refetch }
}
