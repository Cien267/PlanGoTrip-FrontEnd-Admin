import { ref } from 'vue'
import type { HttpMethodType } from '@/types'
import { get, post, put, del } from '@/helpers/axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

export const useAxios = () => {
  const data = ref(null)
  const error = ref<AxiosError | null>(null)
  const loading = ref<boolean>(false)

  const fetchData = async (
    url: string,
    method: HttpMethodType = 'GET',
    payload: any = {},
    config: AxiosRequestConfig = {},
  ) => {
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

  return { data, error, loading, fetchData }
}
