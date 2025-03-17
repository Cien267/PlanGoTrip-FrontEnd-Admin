import type {
  DestinationType,
  AttractionType,
  AccommodationType,
  RestaurantType,
} from '@/types'

export const transform = (
  dataDestination: DestinationType,
  attractionsList: AttractionType[],
  accommodationsList: AccommodationType[],
  restaurantsList: RestaurantType[],
) => {
  const dataRequest: any = {
    destination: {},
    attractions: [],
    accommodations: [],
    restaurants: [],
  }

  try {
    if (dataDestination) {
      dataRequest.destination.name = dataDestination.name ?? ''
      dataRequest.destination.location_id = dataDestination.location_id ?? 0
      dataRequest.destination.ward_id = dataDestination.ward_id ?? 0
      dataRequest.destination.full_address = dataDestination.full_address ?? 0
      dataRequest.destination.description = dataDestination.description ?? ''
      dataRequest.destination.images = dataDestination.images.map(
        (item: string, index: number) => {
          return {
            image_url: item,
            caption: '',
            order: index,
          }
        },
      )
    }

    if (attractionsList) {
      attractionsList.forEach((element: AttractionType) => {
        const openingHours = `${element.openingHour ?? 0}${element.selectedOpeningPeriod.name} - ${element.closingHour ?? 0}${element.selectedClosingPeriod.name}`
        const priceRange = `${element.startPriceRange ?? ''} đồng - ${element.endPriceRange ?? ''} đồng`
        const attraction = {
          name: element.name ?? '',
          attraction_category_id: element.selectedAttractionCategory?.id ?? 0,
          description: element.description ?? '',
          address: element.address ?? '',
          opening_hours: openingHours,
          phone_number: element.phone ?? '',
          estimated_duration: element.estimatedDuration ?? 0,
          price_range: priceRange,
          website_url: element.websiteUrl ?? '',
          images: element.images.map((item: string, index: number) => {
            return {
              image_url: item,
              caption: '',
              order: index,
            }
          }),
        }
        dataRequest.attractions.push(attraction)
      })
    }

    if (accommodationsList) {
      accommodationsList.forEach((element: AccommodationType) => {
        const accommodation = {
          name: element.name ?? '',
          accommodation_category_id:
            element.selectedAccommodationCategory?.id ?? 0,
          description: element.description ?? '',
          address: element.address ?? '',
          phone_number: element.phone ?? '',
          website_url: element.websiteUrl ?? '',
          available_rooms: element.rooms ?? 0,
          check_in_time: `${element.checkInTime}${element.checkInPeriod.name}`,
          check_out_time: `${element.checkOutTime}${element.checkOutPeriod.name}`,
          price_per_night: element.pricePerNight ?? 0,
          rating: element.rating ?? 0,
          amenities: element.amenities ?? '',
          images: element.images.map((item: string, index: number) => {
            return {
              image_url: item,
              caption: '',
              order: index,
            }
          }),
        }
        dataRequest.accommodations.push(accommodation)
      })
    }
    if (restaurantsList) {
      restaurantsList.forEach((element: RestaurantType) => {
        const priceRange = `${element.startPriceRange ?? ''} đồng - ${element.endPriceRange ?? ''} đồng`
        const openingHours = `${element.openingTime ?? 0}${element.openingPeriod.name} - ${element.closingTime ?? 0}${element.closingPeriod.name}`
        const restaurant = {
          name: element.name ?? '',
          restaurant_category_id: element.selectedRestaurantCategory?.id ?? 0,
          description: element.description ?? '',
          address: element.address ?? '',
          phone_number: element.phone ?? '',
          website_url: element.websiteUrl ?? '',
          rating: element.rating ?? 0,
          price_range: priceRange,
          opening_hours: openingHours,
          menu: element.menu ?? '',
          images: element.images.map((item: string, index: number) => {
            return {
              image_url: item,
              caption: '',
              order: index,
            }
          }),
        }
        dataRequest.restaurants.push(restaurant)
      })
    }
    return dataRequest
  } catch (e: any) {
    console.error('error transform data create destination', e)
    return dataRequest
  }
}
