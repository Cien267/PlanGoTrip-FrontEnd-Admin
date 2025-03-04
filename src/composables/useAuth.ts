import { ref, type Ref } from 'vue'
import type { DataLoginType } from '@/types'
import Cookies from 'js-cookie'
import { post } from '@/helpers/axios'
import type { AxiosResponse, AxiosError } from 'axios'

const COOKIES_TOKEN_NAME = 'plangotrip-user-token'
const URL_LOGIN = '/api/login/'
const URL_LOGOUT = '/api/login/'

export const useAuth = () => {
  const token: Ref<string | null> = ref(Cookies.get(COOKIES_TOKEN_NAME) || null)
  const error = ref<AxiosError | null>(null)
  const loading = ref(false)

  const login = async (credentials: DataLoginType) => {
    loading.value = true
    error.value = null

    try {
      const response: AxiosResponse<{ accessToken: string }> = await post(
        URL_LOGIN,
        'POST',
        credentials,
      )
      token.value = response.data.accessToken
      Cookies.set(COOKIES_TOKEN_NAME, token.value, { expires: 1 })
    } catch (err: any) {
      error.value = err
      console.error('Login failed:', err)
    } finally {
      loading.value = false
    }
  }

  const logout = async (id: string | number) => {
    loading.value = true
    error.value = null

    const urlLogOut = `${URL_LOGOUT}/${id}`
    try {
      await post(urlLogOut, 'POST')
      token.value = null
      Cookies.remove(COOKIES_TOKEN_NAME)
    } catch (err: any) {
      error.value = err
      console.error('Login failed:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    token,
    error,
    loading,
    login,
    logout,
  }
}
