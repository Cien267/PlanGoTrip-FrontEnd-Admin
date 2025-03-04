import { ref, type Ref } from 'vue'
import type { DataLoginType } from '@/types'
import Cookies from 'js-cookie'
import { post } from '@/helpers/axios'
import type { AxiosResponse, AxiosError } from 'axios'

const COOKIES_TOKEN_NAME = 'plangotrip-user-token'
const URL_LOGIN = '/api/admin/login'
const URL_LOGOUT = '/api/admin/logout'

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
      await post(urlLogOut)
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
