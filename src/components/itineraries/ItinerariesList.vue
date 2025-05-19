<script setup lang="ts">
import { ref } from 'vue'
import MultiSelect from 'primevue/multiselect'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const selectedItinerary = ref()
const listItineraries = ref([
  {
    id: 1,
    destination: 'Bali, Indonesia',
    image: '/placeholder.svg?height=200&width=300',
    duration: 7,
    price: 1200,
    rating: 4.8,
    type: 'Relaxation',
    description:
      'Experience the perfect blend of beaches, culture, and relaxation in beautiful Bali.',
  },
  {
    id: 2,
    destination: 'Tokyo, Japan',
    image: '/placeholder.svg?height=200&width=300',
    duration: 10,
    price: 2500,
    rating: 4.9,
    type: 'Cultural',
    description:
      'Explore the vibrant city of Tokyo with its unique blend of traditional and modern attractions.',
  },
  {
    id: 3,
    destination: 'Paris, France',
    image: '/placeholder.svg?height=200&width=300',
    duration: 5,
    price: 1800,
    rating: 4.7,
    type: 'Romantic',
    description:
      'Discover the city of love with its iconic landmarks, museums, and charming cafes.',
  },
  {
    id: 4,
    destination: 'Machu Picchu, Peru',
    image: '/placeholder.svg?height=200&width=300',
    duration: 8,
    price: 2200,
    rating: 4.9,
    type: 'Adventure',
    description:
      'Trek through the Andes to discover the ancient Incan citadel of Machu Picchu.',
  },
  {
    id: 5,
    destination: 'Safari, Kenya',
    image: '/placeholder.svg?height=200&width=300',
    duration: 6,
    price: 3000,
    rating: 4.8,
    type: 'Wildlife',
    description:
      "Experience the thrill of seeing Africa's Big Five on a safari adventure in Kenya.",
  },
  {
    id: 6,
    destination: 'Santorini, Greece',
    image: '/placeholder.svg?height=200&width=300',
    duration: 6,
    price: 1900,
    rating: 4.7,
    type: 'Relaxation',
    description:
      'Enjoy stunning sunsets and beautiful white-washed buildings on this Greek island paradise.',
  },
])
</script>

<template>
  <div class="flex min-h-screen">
    <div
      class="hidden md:block w-80 border-r border-gray-200 p-6 overflow-y-auto"
    >
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-800">Lọc</h2>

        <div class="space-y-2">
          <label htmlFor="destination" class="text-sm font-medium">
            Điểm đến
          </label>
          <div class="relative">
            <MultiSelect
              v-model="selectedItinerary"
              :options="listItineraries"
              optionLabel="destination"
              filter
              placeholder="Select itineraries"
              :maxSelectedLabels="3"
              class="w-full"
            />
          </div>
        </div>

        <div class="space-y-2">
          <label htmlFor="duration" class="text-sm font-medium">
            Khoảng thời gian (ngày)
          </label>
          <div class="flex items-center space-x-4">
            <InputNumber inputId="duration" autocomplete="off" suffix=" ngày" />
            <span class="text-gray-500">đến</span>
            <InputNumber inputId="duration" autocomplete="off" suffix=" ngày" />
          </div>
        </div>

        <Button
          label="Tìm kiếm"
          icon="pi pi-search"
          size="small"
          class="w-full"
        />

        <Button
          label="Reset"
          size="small"
          class="w-full"
          severity="secondary"
        />
      </div>
    </div>

    <div class="flex-1 p-6 overflow-y-auto">
      <div class="max-w-7xl mx-auto">
        <div class="w-full flex justify-end">
          <router-link to="/itineraries/create" type="button">
            <Button
              icon="pi pi-plus"
              severity="primary"
              size="small"
              class="p-2 mb-8"
              label="Thêm lịch trình"
            ></Button>
          </router-link>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="itinerary in listItineraries"
            :key="itinerary.id"
            class="rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
          >
            <div class="relative">
              <img
                :src="itinerary.image"
                :alt="itinerary.destination"
                class="h-48 w-full object-cover"
              />
            </div>

            <div class="p-5 space-y-3">
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold line-clamp-1">
                  {{ itinerary.destination }}
                </h3>
              </div>

              <p class="text-sm line-clamp-2">
                {{ itinerary.description }}
              </p>

              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center">
                  <Calendar class="h-4 w-4 mr-1" />
                  <span>{{ itinerary.duration }} ngày</span>
                </div>
                <div class="flex items-center">
                  <DollarSign class="h-4 w-4 mr-1" />
                  <span>${{ itinerary.price }}</span>
                </div>
              </div>

              <Button
                label="Xem chi tiết"
                size="small"
                class="w-full"
                severity="info"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
