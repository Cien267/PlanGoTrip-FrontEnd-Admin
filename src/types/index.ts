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

type ImageDestinationType = {
  id?: number
  destination_id?: number
  image_url: string
  caption: string
  order: number
  created_at?: string
  updated_at?: string
}

type DestinationType = {
  id?: number
  name: string
  province_id: number
  district_id: number
  ward_id: number
  full_address: string
  description: string
  created_at?: string
  updated_at?: string
  images: ImageDestinationType[]
}

type TransformedDestinationType = {
  id: number
  name: string
  province_id: number
  province_name: string
  district_id: number
  district_name: string
  ward_id: number
  ward_name: string
  full_address: string
  description: string
  created_at: string
  images: string[]
}

type ImageRestaurantType = {
  id: number
  destination_restaurant_id: number
  image_url: string
  caption: string
  order: number
  created_at: string
  updated_at: string
}

type DetailRestaurantType = {
  id: number
  destination_id: number
  name: string
  price_range: string
  rating: number
  description: string
  created_at: string
  updated_at: string
  address: string
  phone_number: string
  website_url: string
  category: ElementCategoryType
  opening_hours: string
  menu: string
  images: ImageRestaurantType[]
}

type ImageAttractionType = {
  id: number
  destination_attraction_id: number
  image_url: string
  caption: string
  order: number
  created_at: string
  updated_at: string
}

type ElementCategoryType = {
  id: number
  name: string
  code: string
  description: string
  image: string
}

type DetailAttractionType = {
  id?: number
  destination_id?: number
  name: string
  category: ElementCategoryType
  description: string
  address: string
  estimated_duration: number
  opening_hours: string
  created_at: string
  updated_at: string
  phone_number: string
  price_range: string
  website_url: string
  images: ImageAttractionType[]
}

type ImageAccommodationType = {
  id: number
  destination_accommodation_id: number
  image_url: string
  caption: string
  order: number
  created_at: string
  updated_at: string
}

type DetailAccommodationType = {
  id: number
  destination_id: number
  name: string
  category: ElementCategoryType
  price_per_night: number
  rating: number
  amenities: string
  phone_number: string
  available_rooms: number
  check_out_time: string
  check_in_time: string
  website_url: string
  address: string
  description: string
  created_at: string
  updated_at: string
  images: ImageAccommodationType[]
}

type DetailDestinationType = {
  id?: number
  name: string
  province_id: number
  district_id: number
  ward_id: number
  full_address: string
  description: string
  created_at: string
  updated_at: string
  images: ImageDestinationType[]
  restaurants: DetailRestaurantType[]
  attractions: DetailAttractionType[]
  accommodations: DetailAccommodationType[]
}

type ResponseUploadType = {
  url: string
  original_name: string
}

type AttractionType = {
  uuid: string
  name: string
  selectedAttractionCategory: DestinationAttractionCategoryType
  phone: string
  description: string
  address: string
  openingHour: number
  closingHour: number
  estimatedDuration: number
  selectedOpeningPeriod?: {
    name: string
    value: string
  }
  selectedClosingPeriod?: {
    name: string
    value: string
  }
  startPriceRange: number
  endPriceRange: number
  websiteUrl: string
  images: ImageAttractionType[] | string[]
}

type AccommodationType = {
  uuid: string
  name: string
  selectedAccommodationCategory: DestinationAccommodationCategoryType
  phone: string
  description: string
  address: string
  rooms: number
  checkInTime: number
  checkOutTime: number
  checkInPeriod?: {
    name: string
    value: string
  }
  checkOutPeriod?: {
    name: string
    value: string
  }
  pricePerNight: number
  rating: number
  websiteUrl: string
  amenities: string
  images: ImageAccommodationType[] | string[]
}

type RestaurantType = {
  uuid: string
  name: string
  selectedRestaurantCategory: DestinationRestaurantCategoryType
  phone: string
  description: string
  address: string
  openingTime: number
  closingTime: number
  openingPeriod?: {
    name: string
    value: string
  }
  closingPeriod?: {
    name: string
    value: string
  }
  startPriceRange: number
  endPriceRange: number
  rating: number
  websiteUrl: string
  menu: string
  images: ImageRestaurantType[] | string[]
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
  TransformedDestinationType,
  ImageDestinationType,
  ImageRestaurantType,
  DetailRestaurantType,
  ImageAttractionType,
  DetailAttractionType,
  ImageAccommodationType,
  DetailAccommodationType,
  DetailDestinationType,
}
