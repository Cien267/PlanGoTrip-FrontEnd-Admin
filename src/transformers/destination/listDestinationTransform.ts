import type { DestinationType, ImageDestinationType } from '@/types'

export const transform = (listDestinations: DestinationType[]) => {
  try {
    return listDestinations.map((des: DestinationType) => {
      return {
        id: des.id ?? 0,
        name: des.name ?? '',
        province_id: des.province_id ?? 0,
        province_name: '',
        district_id: des.district_id ?? 0,
        district_name: '',
        ward_id: des.ward_id ?? 0,
        ward_name: '',
        full_address: des.full_address ?? '',
        description: des.description ?? '',
        created_at: des.created_at ?? '',
        images: des.images.map((image: ImageDestinationType) => {
          return image.image_url
        }),
      }
    })
  } catch (e: any) {
    console.error('error transform data list destination', e)
    return []
  }
}
