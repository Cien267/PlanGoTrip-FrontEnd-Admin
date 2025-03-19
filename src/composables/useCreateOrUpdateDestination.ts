import { reactive, ref } from 'vue'
import type {
  DestinationType,
  AttractionType,
  AccommodationType,
  RestaurantType,
} from '@/types'
import { v4 as uuidv4 } from 'uuid'

// destination form
const dataDestination = reactive<DestinationType>({
  name: '',
  location_id: 0,
  ward_id: 0,
  full_address: '',
  description: '',
  images: [],
})

// attraction
const attractionsList = ref<AttractionType[]>([
  {
    uuid: uuidv4(),
    name: '',
    selectedAttractionCategory: '' as any,
    phone: 0,
    description: '',
    address: '',
    openingHour: 0,
    closingHour: 0,
    estimatedDuration: 0,
    selectedOpeningPeriod: {
      name: 'AM',
      value: 'am',
    },
    selectedClosingPeriod: {
      name: 'PM',
      value: 'pm',
    },
    startPriceRange: 0,
    endPriceRange: 0,
    websiteUrl: '',
    images: [],
  },
])

// accommodation
const accommodationsList = ref<AccommodationType[]>([
  {
    uuid: uuidv4(),
    name: '',
    selectedAccommodationCategory: '' as any,
    phone: 0,
    description: '',
    address: '',
    rooms: 0,
    checkInTime: 0,
    checkOutTime: 0,
    checkInPeriod: {
      name: 'AM',
      value: 'am',
    },
    checkOutPeriod: {
      name: 'AM',
      value: 'am',
    },
    pricePerNight: 0,
    rating: 0,
    websiteUrl: '',
    amenities: '',
    images: [],
  },
])

// restaurant
const restaurantsList = ref<RestaurantType[]>([
  {
    uuid: uuidv4(),
    name: '',
    selectedRestaurantCategory: '' as any,
    phone: 0,
    description: '',
    address: '',
    openingTime: 0,
    closingTime: 0,
    openingPeriod: {
      name: 'AM',
      value: 'am',
    },
    closingPeriod: {
      name: 'AM',
      value: 'am',
    },
    startPriceRange: 0,
    endPriceRange: 0,
    rating: 0,
    websiteUrl: '',
    menu: '',
    images: [],
  },
])

export const useCreateOrUpdateDestination = () => {
  // destination form
  const updateLocationDestination = (id: number) => {
    dataDestination.location_id = id
  }
  const updateWardDestination = (id: number) => {
    dataDestination.ward_id = id
  }
  const uploadFileDestination = (images: any[]) => {
    dataDestination.images = images
  }

  // attraction
  const addAttraction = () => {
    attractionsList.value.push({
      uuid: uuidv4(),
      name: '',
      selectedAttractionCategory: {
        id: 0,
        name: '',
        code: '',
        description: '',
        image: '',
      },
      phone: 0,
      description: '',
      address: '',
      openingHour: 0,
      closingHour: 0,
      estimatedDuration: 0,
      selectedOpeningPeriod: {
        name: 'AM',
        value: 'am',
      },
      selectedClosingPeriod: {
        name: 'PM',
        value: 'pm',
      },
      startPriceRange: 0,
      endPriceRange: 0,
      websiteUrl: '',
      images: [],
    })
  }
  const removeAttraction = (uuid: string) => {
    const index = attractionsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      attractionsList.value.splice(index, 1)
    }
  }
  const uploadFileAttraction = (images: any[], uuid: string) => {
    const index = attractionsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      attractionsList.value[index].images = images
    }
  }

  // accommodation
  const addAccommodation = () => {
    accommodationsList.value.push({
      uuid: uuidv4(),
      name: '',
      selectedAccommodationCategory: {
        id: 0,
        name: '',
        code: '',
        description: '',
        image: '',
      },
      phone: 0,
      description: '',
      address: '',
      rooms: 0,
      checkInTime: 0,
      checkOutTime: 0,
      checkInPeriod: {
        name: 'AM',
        value: 'am',
      },
      checkOutPeriod: {
        name: 'AM',
        value: 'am',
      },
      pricePerNight: 0,
      rating: 0,
      websiteUrl: '',
      amenities: '',
      images: [],
    })
  }
  const removeAccommodation = (uuid: string) => {
    const index = accommodationsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      accommodationsList.value.splice(index, 1)
    }
  }
  const uploadFileAccommodation = (images: any[], uuid: string) => {
    const index = accommodationsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      accommodationsList.value[index].images = images
    }
  }

  // restaurant
  const addRestaurant = () => {
    restaurantsList.value.push({
      uuid: uuidv4(),
      name: '',
      selectedRestaurantCategory: {
        id: 0,
        name: '',
        code: '',
        description: '',
        image: '',
      },
      phone: 0,
      description: '',
      address: '',
      openingTime: 0,
      closingTime: 0,
      openingPeriod: {
        name: 'AM',
        value: 'am',
      },
      closingPeriod: {
        name: 'AM',
        value: 'am',
      },
      startPriceRange: 0,
      endPriceRange: 0,
      rating: 0,
      websiteUrl: '',
      menu: '',
      images: [],
    })
  }
  const removeRestaurant = (uuid: string) => {
    const index = restaurantsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      restaurantsList.value.splice(index, 1)
    }
  }

  const uploadFileRestaurant = (images: any[], uuid: string) => {
    const index = restaurantsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      restaurantsList.value[index].images = images
    }
  }

  return {
    // destination form
    dataDestination,
    uploadFileDestination,
    updateLocationDestination,
    updateWardDestination,

    // attraction
    attractionsList,
    addAttraction,
    removeAttraction,
    uploadFileAttraction,

    // accommodation
    accommodationsList,
    addAccommodation,
    removeAccommodation,
    uploadFileAccommodation,

    // restaurant
    restaurantsList,
    addRestaurant,
    removeRestaurant,
    uploadFileRestaurant,
  }
}
