<script setup lang="ts">
import { ref } from 'vue'
import Galleria from 'primevue/galleria'

const { data: restaurant } = defineProps<{ data?: any }>()
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
        :value="restaurant.images"
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
          ><i class="pi pi-map-marker pr-2"></i>{{ restaurant.address }}</span
        >
        <span class="flex items-center gap-2 py-2">
          <img
            :src="restaurant.category.image"
            alt=""
            class="rounded-full w-6 h-6"
          />
          <span class="text-sm text-amber-600">{{
            restaurant.category.name
          }}</span>
        </span>
        <span class="text-xs text-gray-500"
          >Tạo: {{ restaurant.created_at }}</span
        >
        <span class="text-xs text-gray-500"
          >Cập nhật: {{ restaurant.updated_at }}</span
        >
      </div>
    </div>
    <div class="mt-8 text-gray-600 font-mono">
      <i class="pi pi-id-card pr-2"></i>{{ restaurant.description }}
    </div>
    <div class="mt-8 flex flex-col justify-start items-start gap-4 w-full">
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Mức giá:</div>
        <div class="w-1/2 text-cyan-700 font-semibold">
          {{ restaurant.price_range }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Giờ mở cửa:</div>
        <div class="w-1/2 text-cyan-700 font-semibold">
          {{ restaurant.opening_hours }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Menu:</div>
        <div class="w-1/2 text-cyan-700 font-semibold">
          {{ restaurant.menu }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Điện thoại:</div>
        <div class="w-1/2 text-cyan-700 font-semibold">
          {{ restaurant.phone_number }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Website:</div>
        <div class="w-1/2 text-cyan-700 font-semibold">
          {{ restaurant.website_url }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Đánh giá:</div>
        <div class="w-1/2 text-cyan-700 font-semibold">
          {{ restaurant.rating }}
          <i class="pi pi-star-fill text-yellow-400"></i>
        </div>
      </div>
    </div>
  </div>
</template>
