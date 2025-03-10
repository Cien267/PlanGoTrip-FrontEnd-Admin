type DataLoginType = {
  email: string
  password: string
}

type HttpMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | (string & {})

type AdminType = {
  id: number
  name: string
  email: string
}

export type { DataLoginType, HttpMethodType, AdminType }
