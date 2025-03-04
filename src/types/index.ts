type DataLoginType = {
  email: string
  passWord: string
}

type HttpMethodType = 'GET' | 'POST' | 'DELETE' | 'PUT' | (string & {})

export type { DataLoginType, HttpMethodType }
