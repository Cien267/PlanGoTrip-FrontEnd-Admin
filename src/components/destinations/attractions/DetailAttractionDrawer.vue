<script setup lang="ts">
import { ref } from 'vue'
import Galleria from 'primevue/galleria'

const { data: attraction } = defineProps<{ data?: any }>()

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
        :value="attraction.images"
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
          ><i class="pi pi-map-marker pr-2"></i>{{ attraction.address }}</span
        >
        <span class="flex items-center gap-2 py-2">
          <img
            :src="attraction.category.image"
            alt=""
            class="rounded-full w-6 h-6"
          />
          <span class="text-sm text-amber-600">{{
            attraction.category.name
          }}</span>
        </span>
        <span class="text-xs text-gray-500"
          >Tạo: {{ attraction.created_at }}</span
        >
        <span class="text-xs text-gray-500"
          >Cập nhật: {{ attraction.updated_at }}</span
        >
      </div>
    </div>
    <div class="mt-8 text-gray-600 font-mono">
      <i class="pi pi-id-card pr-2"></i>{{ attraction.description }}
    </div>
    <div class="mt-8 flex flex-col justify-start items-start gap-4 w-full">
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Thời gian mở cửa:</div>
        <div class="w-1/2 text-emerald-700 font-semibold">
          {{ attraction.opening_hours }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Thời gian tham quan dự kiến:</div>
        <div class="w-1/2 text-emerald-700 font-semibold">
          {{ attraction.estimated_duration }} tiếng
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Mức giá:</div>
        <div class="w-1/2 text-emerald-700 font-semibold">
          {{ attraction.price_range }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Điện thoại:</div>
        <div class="w-1/2 text-emerald-700 font-semibold">
          {{ attraction.phone_number }}
        </div>
      </div>
      <div class="w-full flex justify-between items-center flex-wrap">
        <div class="w-1/2 font-semibold">Website:</div>
        <div class="w-1/2 text-emerald-700 font-semibold">
          {{ attraction.website_url }}
        </div>
      </div>
    </div>
  </div>
</template>
