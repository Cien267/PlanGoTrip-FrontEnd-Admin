import { reactive, ref } from 'vue'
import type {
  DestinationType,
  AttractionType,
  AccommodationType,
  RestaurantType,
  DetailDestinationType,
  DetailAttractionType,
  DetailAccommodationType,
  DetailRestaurantType,
  ImageAccommodationType,
  ImageAttractionType,
  ImageRestaurantType,
} from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { DAY_PERIODS } from '@/constants/destinations'

// destination form
const dataDestination = reactive<DestinationType>({
  name: '',
  district_id: 0,
  province_id: 0,
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
    phone: '',
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
    phone: '',
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
    phone: '',
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
  const updateProvinceDestination = (id: number) => {
    dataDestination.province_id = id
  }
  const updateDistrictDestination = (id: number) => {
    dataDestination.district_id = id
  }
  const updateWardDestination = (id: number) => {
    dataDestination.ward_id = id
  }
  const uploadFileDestination = (images: any[]) => {
    dataDestination.images.push(...(images as any))
  }
  const removeFileDestination = (image: string) => {
    const index = (dataDestination.images as any).find(
      (item: string) => item === image,
    )
    if (index !== -1) {
      dataDestination.images.splice(index, 1)
    }
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
      phone: '',
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
      attractionsList.value[index].images.push(...(images as any))
    }
  }
  const removeFileAttraction = (image: string, uuid: string) => {
    const index = attractionsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      const indexImage = (attractionsList.value[index].images as any).find(
        (item: ImageAttractionType) => item.image_url === image,
      )
      if (indexImage !== -1) {
        ;(attractionsList.value[index].images as any).splice(indexImage, 1)
      }
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
      phone: '',
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
      accommodationsList.value[index].images.push(...(images as any))
    }
  }
  const removeFileAccommodation = (image: string, uuid: string) => {
    const index = accommodationsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      const indexImage = (accommodationsList.value[index].images as any).find(
        (item: ImageAccommodationType) => item.image_url === image,
      )
      if (indexImage !== -1) {
        ;(accommodationsList.value[index].images as any).splice(indexImage, 1)
      }
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
      phone: '',
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
      restaurantsList.value[index].images.push(...(images as any))
    }
  }
  const removeFileRestaurant = (image: string, uuid: string) => {
    const index = restaurantsList.value.findIndex(item => item.uuid === uuid)
    if (index !== -1) {
      const indexImage = (restaurantsList.value[index].images as any).find(
        (item: ImageRestaurantType) => item.image_url === image,
      )
      if (indexImage !== -1) {
        ;(restaurantsList.value[index].images as any).splice(indexImage, 1)
      }
    }
  }

  // reset all data
  const resetData = () => {
    // reset destination
    dataDestination.name = ''
    dataDestination.district_id = 0
    dataDestination.province_id = 0
    dataDestination.ward_id = 0
    dataDestination.full_address = ''
    dataDestination.description = ''
    dataDestination.images = []

    // reset attraction
    attractionsList.value = [
      {
        uuid: uuidv4(),
        name: '',
        selectedAttractionCategory: '' as any,
        phone: '',
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
    ]

    // reset accommodation
    accommodationsList.value = [
      {
        uuid: uuidv4(),
        name: '',
        selectedAccommodationCategory: '' as any,
        phone: '',
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
    ]

    // reset restaurant
    restaurantsList.value = [
      {
        uuid: uuidv4(),
        name: '',
        selectedRestaurantCategory: '' as any,
        phone: '',
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
    ]
  }

  // setup data for update
  const setupData = (destination: DetailDestinationType) => {
    dataDestination.id = destination.id ?? 0
    dataDestination.name = destination.name ?? ''
    dataDestination.district_id = destination.district_id ?? 0
    dataDestination.province_id = destination.province_id ?? 0
    dataDestination.ward_id = destination.ward_id ?? 0
    dataDestination.full_address = destination.full_address ?? ''
    dataDestination.description = destination.description ?? 0
    dataDestination.images = destination.images ?? []

    attractionsList.value = destination.attractions.map(
      (att: DetailAttractionType) => {
        // opening - closing hour
        const [openingHour, closingHour] = att.opening_hours.split(' - ')
        const openingVal = openingHour.slice(0, -2)
        const openingPeriod = DAY_PERIODS.find(
          item => item.name === openingHour.slice(-2),
        )
        const closingVal = closingHour.slice(0, -2)
        const closingPeriod = DAY_PERIODS.find(
          item => item.name === closingHour.slice(-2),
        )

        // price range
        const [start, end] = att.price_range.split(' - ')
        const startPrice = start.slice(0, -5)
        const endPrice = end.slice(0, -5)

        return {
          uuid: `${att.id}`,
          name: att.name ?? '',
          selectedAttractionCategory: att.category ?? {},
          phone: att.phone_number ?? '',
          description: att.description ?? '',
          address: att.address ?? '',
          openingHour: Number(openingVal),
          closingHour: Number(closingVal),
          estimatedDuration: att.estimated_duration ?? 0,
          selectedOpeningPeriod: openingPeriod,
          selectedClosingPeriod: closingPeriod,
          startPriceRange: Number(startPrice) ?? 0,
          endPriceRange: Number(endPrice) ?? 0,
          websiteUrl: att.website_url ?? '',
          images: att.images ?? [],
        }
      },
    )

    accommodationsList.value = destination.accommodations.map(
      (acc: DetailAccommodationType) => {
        // check in
        const checkInTime = acc.check_in_time.slice(0, -2)
        const checkInPeriod = DAY_PERIODS.find(
          item => item.name === acc.check_in_time.slice(-2),
        )

        // check out
        const checkOutTime = acc.check_out_time.slice(0, -2)
        const checkOutPeriod = DAY_PERIODS.find(
          item => item.name === acc.check_out_time.slice(-2),
        )

        return {
          uuid: `${acc.id}`,
          name: acc.name ?? '',
          selectedAccommodationCategory: acc.category ?? {},
          phone: acc.phone_number ?? '',
          description: acc.description ?? '',
          address: acc.address ?? '',
          rooms: acc.available_rooms ?? 0,
          checkInTime: Number(checkInTime) ?? 0,
          checkOutTime: Number(checkOutTime) ?? 0,
          checkInPeriod: checkInPeriod,
          checkOutPeriod: checkOutPeriod,
          pricePerNight: acc.price_per_night ?? 0,
          rating: acc.rating ?? 0,
          websiteUrl: acc.website_url ?? '',
          amenities: acc.amenities ?? '',
          images: acc.images ?? [],
        }
      },
    )

    restaurantsList.value = destination.restaurants.map(
      (res: DetailRestaurantType) => {
        // opening - closing hour
        const [openingHour, closingHour] = res.opening_hours.split(' - ')
        const openingVal = openingHour.slice(0, -2)
        const openingPeriod = DAY_PERIODS.find(
          item => item.name === openingHour.slice(-2),
        )
        const closingVal = closingHour.slice(0, -2)
        const closingPeriod = DAY_PERIODS.find(
          item => item.name === closingHour.slice(-2),
        )

        // price range
        const [start, end] = res.price_range.split(' - ')
        const startPrice = start.slice(0, -5)
        const endPrice = end.slice(0, -5)

        return {
          uuid: `${res.id}`,
          name: res.name ?? '',
          selectedRestaurantCategory: res.category ?? {},
          phone: res.phone_number ?? '',
          description: res.description ?? '',
          address: res.address ?? '',
          openingTime: Number(openingVal) ?? 0,
          closingTime: Number(closingVal) ?? 0,
          openingPeriod: openingPeriod,
          closingPeriod: closingPeriod,
          startPriceRange: Number(startPrice) ?? 0,
          endPriceRange: Number(endPrice) ?? 0,
          rating: res.rating ?? 0,
          websiteUrl: res.website_url ?? '',
          menu: res.menu ?? '',
          images: res.images ?? [],
        }
      },
    )
  }

  return {
    // destination form
    dataDestination,
    uploadFileDestination,
    removeFileDestination,
    updateProvinceDestination,
    updateDistrictDestination,
    updateWardDestination,

    // attraction
    attractionsList,
    addAttraction,
    removeAttraction,
    uploadFileAttraction,
    removeFileAttraction,

    // accommodation
    accommodationsList,
    addAccommodation,
    removeAccommodation,
    uploadFileAccommodation,
    removeFileAccommodation,

    // restaurant
    restaurantsList,
    addRestaurant,
    removeRestaurant,
    uploadFileRestaurant,
    removeFileRestaurant,

    // reset
    resetData,

    // setup data for update
    setupData,
  }
}
