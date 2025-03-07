import { ref, type Ref } from 'vue'
import type { DataLoginType } from '@/types'
import Cookies from 'js-cookie'
import { post } from '@/helpers/axios'
import type { AxiosResponse, AxiosError } from 'axios'
import { URL_LOGIN, URL_LOGOUT } from '@/constants/url'

const COOKIES_TOKEN_NAME = 'plangotrip-user-token'

const token: Ref<string | null> = ref(Cookies.get(COOKIES_TOKEN_NAME) || null)
export const useAuth = () => {
  const error = ref<AxiosError | null>(null)
  const loading = ref(false)

  const login = async (credentials: DataLoginType) => {
    loading.value = true
    error.value = null
    try {
      const response: AxiosResponse<{ access_token: string }> = await post(
        URL_LOGIN,
        credentials,
      )
      token.value = response.data.access_token
      Cookies.set(COOKIES_TOKEN_NAME, token.value, { expires: 0.1 })
    } catch (err: any) {
      error.value = err
      console.error('Login failed:', err)
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    error.value = null

    try {
      await post(
        URL_LOGOUT,
        {},
        { headers: { Authorization: `Bearer ${token.value}` } },
      )
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
