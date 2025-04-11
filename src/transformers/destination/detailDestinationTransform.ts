import type {
  DetailAttractionType,
  DetailDestinationType,
  ImageDestinationType,
  ImageAttractionType,
  DetailAccommodationType,
  ImageAccommodationType,
  DetailRestaurantType,
  ImageRestaurantType,
} from '@/types'
import dayjs from 'dayjs'

export const transform = (destination: DetailDestinationType) => {
  const result = {
    key: '0',
    type: 'destination',
    styleClass:
      'text-white rounded-lg shadow-lg cursor-pointer hover:!bg-sky-100',
    data: {},
    children: [
      {
        key: '0_0',
        type: 'element',
        styleClass:
          '!rounded-full shadow-lg cursor-pointer hover:!bg-[rgba(144,238,144,0.4)] text-white w-38 h-38',
        data: {
          image: '/src/assets/images/circus.svg',
          name: 'Điểm tham quan',
        },
        children: [],
      },
      {
        key: '0_1',
        type: 'element',
        styleClass:
          '!rounded-full shadow-lg cursor-pointer hover:!bg-[rgba(255,200,150,0.4)] text-white w-38 h-38',
        data: {
          image: '/src/assets/images/hotel.svg',
          name: 'Nơi trú',
          title: 'CTO',
        },
        children: [],
      },
      {
        key: '0_2',
        type: 'element',
        styleClass:
          '!rounded-full shadow-lg cursor-pointer hover:!bg-[rgba(173,216,230,0.4)] text-white w-38 h-38',
        data: {
          image: '/src/assets/images/restaurant.svg',
          name: 'Điểm ăn uống',
          title: 'CTO',
        },
        children: [],
      },
    ],
  }
  try {
    // destination
    result.data = {
      id: destination.id ?? 0,
      name: destination.name ?? '',
      full_address: destination.full_address ?? '',
      description: destination.description ?? '',
      province_id: destination.province_id ?? 0,
      province_name: '',
      district_id: destination.district_id ?? 0,
      district_name: '',
      ward_id: destination.ward_id ?? 0,
      ward_name: '',
      images: destination.images.map((image: ImageDestinationType) => {
        return image.image_url ?? ''
      }),
    }

    result.children.forEach((child: any) => {
      // attraction
      if (child.key === '0_0') {
        child.children = destination.attractions.map(
          (att: DetailAttractionType) => {
            return {
              id: att.id ?? 0,
              name: att.name ?? '',
              category: {
                name: att.category?.name ?? '',
                image: att.category?.image ?? '',
              },
              description: att.description ?? '',
              address: att.address ?? '',
              estimated_duration: att.estimated_duration ?? '',
              opening_hours: att.opening_hours ?? '',
              created_at: dayjs(att.created_at ?? '').format(
                'DD/MM/YYYY HH:mm',
              ),
              updated_at: dayjs(att.updated_at ?? '').format(
                'DD/MM/YYYY HH:mm',
              ),
              phone_number: att.phone_number ?? '',
              price_range: att.price_range ?? '',
              website_url: att.website_url ?? '',
              images: att.images.map((image: ImageAttractionType) => {
                return image.image_url ?? ''
              }),

              type: 'attraction',
              styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
            }
          },
        )
        // accommodation
      } else if (child.key === '0_1') {
        child.children = destination.accommodations.map(
          (acc: DetailAccommodationType) => {
            return {
              id: acc.id ?? 0,
              name: acc.name ?? '',
              category: {
                name: acc.category?.name ?? '',
                image: acc.category?.image ?? '',
              },
              description: acc.description ?? '',
              address: acc.address ?? '',
              created_at: dayjs(acc.created_at ?? '').format(
                'DD/MM/YYYY HH:mm',
              ),
              updated_at: dayjs(acc.updated_at ?? '').format(
                'DD/MM/YYYY HH:mm',
              ),
              phone_number: acc.phone_number ?? '',
              website_url: acc.website_url ?? '',
              price_per_night: acc.price_per_night ?? 0,
              rating: acc.rating ?? 0,
              amenities: acc.amenities ?? '',
              available_rooms: acc.available_rooms ?? 0,
              check_out_time: acc.check_out_time ?? '',
              check_in_time: acc.check_in_time ?? '',
              images: acc.images.map((image: ImageAccommodationType) => {
                return image.image_url ?? ''
              }),

              type: 'accommodation',
              styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
            }
          },
        )
        // restaurant
      } else if (child.key === '0_2') {
        child.children = destination.restaurants.map(
          (res: DetailRestaurantType) => {
            return {
              id: res.id ?? 0,
              name: res.name ?? '',
              category: {
                name: res.category?.name ?? '',
                image: res.category?.image ?? '',
              },
              description: res.description ?? '',
              address: res.address ?? '',
              created_at: dayjs(res.created_at ?? '').format(
                'DD/MM/YYYY HH:mm',
              ),
              updated_at: dayjs(res.updated_at ?? '').format(
                'DD/MM/YYYY HH:mm',
              ),
              phone_number: res.phone_number ?? '',
              website_url: res.website_url ?? '',
              rating: res.rating ?? 0,
              price_range: res.price_range ?? '',
              opening_hours: res.opening_hours ?? '',
              menu: res.menu ?? '',
              images: res.images.map((image: ImageRestaurantType) => {
                return image.image_url ?? ''
              }),

              type: 'restaurant',
              styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
            }
          },
        )
      }
    })
    return result
  } catch (e: any) {
    console.error('error transform data create destination', e)
    return result
  }
}
