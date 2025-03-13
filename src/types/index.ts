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

type DesImageType = {
  id: number
  url: string
  caption: string
  order?: number
}

type DestinationType = {
  id: number
  name: string
  province_id: number
  district_id: number
  ward_id: number
  full_address: string
  description: string
  images: DesImageType[]
}

export type {
  DataLoginType,
  HttpMethodType,
  AdminType,
  VehicleType,
  DestinationType,
}
