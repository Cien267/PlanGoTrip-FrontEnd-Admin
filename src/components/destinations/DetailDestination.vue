<script setup lang="ts">
import OrganizationChart from 'primevue/organizationchart'
import Drawer from 'primevue/drawer'
import { ref, shallowRef, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAxios } from '@/composables/useAxios'
import { useToast } from 'primevue/usetoast'
import { URL_DETAIL_DESTINATION } from '@/constants/url'
import { transform } from '@/transformers/destination/detailDestinationTransform'
import type {
  DetailAttractionType,
  DetailAccommodationType,
  DetailRestaurantType,
} from '@/types'
import DetailDestinationDrawer from '@/components/destinations/DetailDestinationDrawer.vue'
import DetailAttractionDrawer from '@/components/destinations/attractions/DetailAttractionDrawer.vue'
import DetailAccommodationDrawer from '@/components/destinations/accommodations/DetailAccommodationDrawer.vue'
import DetailRestaurantDrawer from '@/components/destinations/restaurants/DetailRestaurantDrawer.vue'
import EntireScreenLoader from '../common/EntireScreenLoader.vue'

// fetching detail destination
const destination = ref<any>(null)
const route = useRoute()
const toast = useToast()
const { data, error, loading, fetchData } = useAxios()
onMounted(async () => {
  const desId = route.params.id || 0
  if (desId) {
    try {
      await fetchData(`${URL_DETAIL_DESTINATION}${desId}`, 'GET')
      if (error.value) {
        console.error(error)
        toast.add({
          severity: 'error',
          summary: 'Có lỗi xảy ra khi lấy thông tin chi tiết destination',
          life: 3000,
        })
        return
      }
      destination.value = transform(data.value.data ?? {})
      console.log('destination.value', destination.value)
    } catch (e: any) {
      console.error(e)
      toast.add({
        severity: 'error',
        summary: 'Có lỗi xảy ra',
        life: 3000,
      })
    }
  }
})

// detail destination
const visible = ref(false)
const drawerHeader = ref('')
const component = shallowRef()
const dataDetail = ref()
const showDetailDestination = () => {
  dataDetail.value = destination.value.data
  drawerHeader.value = destination.value.data?.name ?? ''
  component.value = DetailDestinationDrawer
  visible.value = true
}

// detail element
const showDetailElement = (type: string, id: number) => {
  let key = '0_0'
  switch (type) {
    case 'attraction':
      component.value = DetailAttractionDrawer
      key = '0_0'
      break
    case 'accommodation':
      component.value = DetailAccommodationDrawer
      key = '0_1'
      break
    case 'restaurant':
      component.value = DetailRestaurantDrawer
      key = '0_2'
      break
  }
  const item = destination.value.children.find((item: any) => item.key === key)
  if (item) {
    dataDetail.value = item.children.find(
      (
        item:
          | DetailAttractionType
          | DetailAccommodationType
          | DetailRestaurantType,
      ) => item.id === id,
    )
    drawerHeader.value = dataDetail.value?.name ?? ''
    visible.value = true
  }
}
</script>
<template>
  <entire-screen-loader v-if="loading"></entire-screen-loader>
  <div
    class="flex justify-center items-center w-full h-[calc(100vh-30px)]"
    v-if="destination"
  >
    <OrganizationChart :value="destination as any" collapsible>
      <template #destination="slotProps">
        <div
          class="flex justify-center items-center gap-8 p-4"
          @click="showDetailDestination"
        >
          <img
            :alt="slotProps.node.data.name"
            :src="slotProps.node.data.images[0]"
            class="mb-4 w-28 h-28 rounded-lg"
          />
          <div class="flex flex-col items-center">
            <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
            <span class="text-xs text-gray-600">{{
              slotProps.node.data.address
            }}</span>
          </div>
        </div>
      </template>
      <template #element="slotProps">
        <div class="flex flex-col justify-center items-center gap-2 p-2">
          <img
            :alt="slotProps.node.data.name"
            :src="slotProps.node.data.image"
            class="w-12 h-12 rounded-lg"
          />
          <div class="flex flex-col items-center">
            <span class="font-bold mb-2 text-sm">{{
              slotProps.node.data.name
            }}</span>
          </div>
        </div>
      </template>
      <template #default="slotProps">
        <div
          class="div w-60 bg-white m-auto rounded-xl relative group p-2 z-0 overflow-hidden"
          @click="showDetailElement(slotProps.node.type, slotProps.node.id)"
        >
          <div
            class="h-[7em] w-[7em] bg-[#9FE2BF] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"
          ></div>
          <div
            class="h-[6em] w-[6em] bg-[#40E0D0] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"
          ></div>
          <div
            class="h-[5em] w-[5em] bg-[#6495ED] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"
          ></div>
          <div class="flex items-center justify-center flex-col gap-2">
            <h3
              class="z-20 font-bold text-md group-hover:text-white duration-100"
            >
              {{ slotProps.node.name }}
            </h3>
            <h3
              class="z-20 font-bold text-md group-hover:text-white duration-100 flex justify-center items-center gap-2"
            >
              <img
                :src="slotProps.node.category.image"
                alt=""
                class="rounded-full w-6 h-6"
              />
              <span class="text-sm text-amber-600">{{
                slotProps.node.category.name
              }}</span>
            </h3>
            <h3
              class="z-20 font-bold text-md group-hover:text-white duration-100 text-sm text-cyan-400 flex justify-center items-center gap-2"
            >
              <i class="pi pi-map-marker"></i>{{ slotProps.node.address }}
            </h3>
          </div>
        </div>
      </template>
    </OrganizationChart>
    <Drawer
      v-model:visible="visible"
      :header="drawerHeader"
      class="!w-full md:!w-80 lg:!w-1/2"
    >
      <component :is="component" :data="dataDetail"></component>
    </Drawer>
  </div>
</template>
<style scoped>
.p-organizationchart {
  max-width: 100%;
}
</style>
