<script setup lang="ts">
import InputText from 'primevue/inputtext'
import EntireScreenLoader from '@/components/common/EntireScreenLoader.vue'
import { ref, onMounted, computed } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { URL_GET_DESTINATIONS } from '@/constants/url'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import type { DestinationType } from '@/types'
import Card from 'primevue/card'
import Button from 'primevue/button'
// import Galleria from 'primevue/galleria'

const searchKeyword = ref()

// list destination
const listDestinations = ref<DestinationType[]>([])
const listFilteredDestinations = computed(() => {
  // return listDestinations.value.filter((item: DestinationType) =>
  //   item.name.includes(searchKeyword.value.trim()),
  // )
  return [
    {
      id: 1,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 2,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 3,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 4,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 5,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 6,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 7,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 8,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 9,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
    {
      id: 10,
      name: 'Hòa Bình',
      province_id: 1,
      district_id: 1,
      ward_id: 1,
      full_address: 'Hòa Bình, Việt Nam',
      description: 'rất đẹp',
      images: [
        {
          id: 1,
          url: 'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
          caption: 'Pà Cò',
          order: 1,
        },
        {
          id: 2,
          url: 'https://i.pinimg.com/736x/4e/2d/c2/4e2dc228e370f0bba046f289da0719f6.jpg',
          caption: 'Pà Cò',
          order: 2,
        },
        {
          id: 3,
          url: 'https://i.pinimg.com/736x/29/38/4e/29384e0b1c1adbbd307c712496cf961d.jpg',
          caption: 'Pà Cò',
          order: 3,
        },
      ],
    },
  ]
})
// const responsiveOptions = ref([
//   {
//     breakpoint: '1300px',
//     numVisible: 4,
//   },
//   {
//     breakpoint: '575px',
//     numVisible: 1,
//   },
// ])
const { data, error, loading, fetchData } = useAxios()
const getListDestinations = async () => {
  await fetchData(URL_GET_DESTINATIONS, 'GET')
  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi láy danh sách điểm đến',
      life: 3000,
    })
    return
  }
  listDestinations.value = data.value?.data || []
}

onMounted(async () => {
  await getListDestinations()
})
</script>
<template>
  <entire-screen-loader v-if="loading"></entire-screen-loader>
  <div class="flex flex-col justify-center items-center gap-10 p-10">
    <div class="flex flex-col items-center gap-4">
      <div class="w-full flex justify-center items-center gap-4">
        <router-link to="/destinations/create" type="button">
          <Button
            icon="pi pi-plus"
            severity="primary"
            size="small"
            class="p-2"
            label="Thêm điểm đến"
          ></Button>
        </router-link>
        <router-link to="/destinations/attraction-categories" type="button">
          <Button
            severity="info"
            size="small"
            class="p-2"
            raised
            label="Quản lý Phân loại Điểm tham quan"
          ></Button>
        </router-link>
        <router-link to="/destinations/accommodation-categories" type="button">
          <Button
            severity="info"
            size="small"
            class="p-2"
            raised
            label="Quản lý Phân loại Nơi trú"
          ></Button>
        </router-link>
        <router-link to="/destinations/restaurant-categories" type="button">
          <Button
            severity="info"
            size="small"
            class="p-2"
            raised
            label="Quản lý Phân loại Điểm ăn uống"
          ></Button>
        </router-link>
      </div>
      <div class="relative">
        <i
          class="pi pi-search absolute left-2 top-1/2 -translate-y-1/2 text-blue-500"
        ></i>
        <InputText
          class="w-full min-w-lg !pl-8"
          placeholder="Tìm kiếm"
          v-model="searchKeyword"
        />
      </div>
    </div>
    <div class="py-10 flex flex-wrap justify-center items-center gap-4">
      <template
        v-for="destination in listFilteredDestinations"
        :key="destination.id"
      >
        <Card
          class="!shadow-lg w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)] min-w-sm"
        >
          <template #header>
            <!-- <Galleria
              :value="destination.images"
              :responsiveOptions="responsiveOptions"
              :numVisible="5"
              containerStyle="max-width: 640px"
            >
              <template #item="slotProps">
                <img
                  :src="slotProps.item.url"
                  :alt="slotProps.item.caption"
                  style="width: 100%"
                />
              </template>
              <template #thumbnail="slotProps">
                <img :src="slotProps.item.url" :alt="slotProps.item.caption" />
              </template>
            </Galleria> -->
            <img alt="" :src="destination.images[0].url" />
          </template>
          <template #title>
            <router-link
              :to="`/destination/${destination.id}`"
              type="button"
              class="cursor-pointer text-sky-400 hover:text-sky-600 font-semibold"
            >
              {{ destination.name }}
            </router-link>
          </template>
          <template #subtitle>{{ destination.full_address }}</template>
          <template #content>
            <p class="m-0">
              {{ destination.description }}
            </p>
          </template>
          <template #footer>
            <div class="flex justify-center gap-4 mt-1">
              <Button
                icon="pi pi-eye"
                aria-label="Detail"
                severity="info"
                variant="text"
              />
              <Button
                icon="pi pi-trash"
                aria-label="Delete"
                severity="danger"
                variant="text"
              />
              <Button
                icon="pi pi-pen-to-square"
                aria-label="Edit"
                severity="warn"
                variant="text"
              />
            </div>
          </template>
        </Card>
      </template>
    </div>
  </div>
</template>
