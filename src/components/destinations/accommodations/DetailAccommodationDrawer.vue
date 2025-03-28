<script setup lang="ts">
import { ref } from 'vue'
import Galleria from 'primevue/galleria'

const { data: accommodation } = defineProps<{ data?: any }>()
const responsiveOptions = ref([
  {
    breakpoint: '1300px',
    numVisible: 4,
  },
  {
    breakpoint: '575px',
    numVisible: 1,
  },
])
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between items-start gap-4">
      <Galleria
        :value="accommodation.images"
        :responsiveOptions="responsiveOptions"
        :numVisible="5"
        containerStyle="max-width: 50%"
      >
        <template #item="slotProps">
          <img
            :src="slotProps.item"
            :alt="slotProps.item"
            style="width: 100%"
          />
        </template>
        <template #thumbnail="slotProps">
          <img :src="slotProps.item" :alt="slotProps.item" />
        </template>
      </Galleria>
      <div class="flex flex-col justify-start items-start h-full w-1/2">
        <span class="text-gray-800 font-bold text-md"
          ><i class="pi pi-map-marker pr-2"></i
          >{{ accommodation.address }}</span
        >
        <span>
          <img
            :src="accommodation.category.image"
            alt=""
            class="rounded-full w-6 h-6"
          />
          <span class="text-sm text-amber-600">{{
            accommodation.category.name
          }}</span>
        </span>
        <span class="text-xs text-gray-500"
          >Tạo: {{ accommodation.created_at }}</span
        >
        <span class="text-xs text-gray-500"
          >Cập nhật: {{ accommodation.updated_at }}</span
        >
      </div>
    </div>
    <div class="mt-8 text-gray-600 font-mono">
      <i class="pi pi-id-card pr-2"></i>{{ accommodation.description }}
    </div>
    <div class="mt-8 flex flex-col justify-start items-start gap-4 w-full">
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Giá:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.price_per_night }} đ/đêm
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Lượng phòng:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.available_rooms }} phòng
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Check in:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.check_in_time }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Check out:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.check_out_time }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Tiện ích:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.amenities }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Điện thoại:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.phone_number }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Website:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.website_url }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Đánh giá:</div>
        <div class="w-1/2 text-amber-700 font-semibold">
          {{ accommodation.rating }}
          <i class="pi pi-star-fill text-yellow-400"></i>
        </div>
      </div>
    </div>
  </div>
</template>
