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

type VehicleType = {
  id: number
  name: string
  image: string
  description: string
  fuel_consumption: string | number
}

export type { DataLoginType, HttpMethodType, AdminType, VehicleType }
