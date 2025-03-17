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

type DestinationType = {
  id?: number
  name: string
  location_id: number
  ward_id: number
  full_address: string
  description: string
  images: string[]
}

type ResponseUploadType = {
  url: string
  original_name: string
}

type AttractionType = {
  uuid: string
  name: string
  selectedAttractionCategory: DestinationAttractionCategoryType
  phone: number
  description: string
  address: string
  openingHour: number
  closingHour: number
  estimatedDuration: number
  selectedOpeningPeriod: {
    name: string
    value: string
  }
  selectedClosingPeriod: {
    name: string
    value: string
  }
  startPriceRange: number
  endPriceRange: number
  websiteUrl: string
  images: string[]
}

type AccommodationType = {
  uuid: string
  name: string
  selectedAccommodationCategory: DestinationAccommodationCategoryType
  phone: number
  description: string
  address: string
  rooms: number
  checkInTime: number
  checkOutTime: number
  checkInPeriod: {
    name: string
    value: string
  }
  checkOutPeriod: {
    name: string
    value: string
  }
  pricePerNight: number
  rating: number
  websiteUrl: string
  amenities: string
  images: string[]
}

type RestaurantType = {
  uuid: string
  name: string
  selectedRestaurantCategory: DestinationRestaurantCategoryType
  phone: number
  description: string
  address: string
  openingTime: number
  closingTime: number
  openingPeriod: {
    name: string
    value: string
  }
  closingPeriod: {
    name: string
    value: string
  }
  startPriceRange: number
  endPriceRange: number
  rating: number
  websiteUrl: string
  menu: string
  images: string[]
}

type DestinationAttractionCategoryType = {
  id: number
  name: string
  code: string
  description: string
  image: string
}

type DestinationAccommodationCategoryType = {
  id: number
  name: string
  code: string
  description: string
  image: string
}

type DestinationRestaurantCategoryType = {
  id: number
  name: string
  code: string
  description: string
  image: string
}

export type {
  DataLoginType,
  HttpMethodType,
  AdminType,
  VehicleType,
  DestinationType,
  ResponseUploadType,
  AttractionType,
  AccommodationType,
  RestaurantType,
  DestinationAttractionCategoryType,
  DestinationAccommodationCategoryType,
  DestinationRestaurantCategoryType,
}
