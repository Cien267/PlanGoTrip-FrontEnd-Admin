<script setup lang="ts">
import { ref } from 'vue'
import Galleria from 'primevue/galleria'

const { data: destination } = defineProps<{ data?: any }>()

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
        :value="destination.images"
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
          >{{ destination.full_address }}</span
        >
      </div>
    </div>
    <div class="mt-4 text-gray-600 font-mono">
      <i class="pi pi-id-card pr-2"></i>{{ destination.description }}
    </div>
  </div>
</template>
