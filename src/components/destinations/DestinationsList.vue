<script setup lang="ts">
import InputText from 'primevue/inputtext'
import EntireScreenLoader from '@/components/common/EntireScreenLoader.vue'
import { ref, onMounted, computed } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { URL_GET_DESTINATIONS, URL_DELETE_DESTINATION } from '@/constants/url'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import type { TransformedDestinationType } from '@/types'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { transform } from '@/transformers/destination/listDestinationTransform'
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'

const searchKeyword = ref('')

// list destination
const listDestinations = ref<TransformedDestinationType[]>([])
const listFilteredDestinations = computed(() => {
  return listDestinations.value.filter((item: TransformedDestinationType) =>
    item.name.includes(searchKeyword.value.trim()),
  )
})

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
  listDestinations.value = transform(data.value?.data || [])
  console.log('listDestinations.value', listDestinations.value)
}

onMounted(async () => {
  await getListDestinations()
})

// delete
const confirm = useConfirm()
const removeDestination = (
  event: any,
  destination: TransformedDestinationType,
) => {
  confirm.require({
    target: event.currentTarget,
    message: `Bạn có chắc chắn muốn xóa điểm đến ${destination.name} này?`,
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Hủy',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Xóa',
      severity: 'danger',
    },
    accept: async () => {
      await fetchData(`${URL_DELETE_DESTINATION}${destination.id}`, 'DELETE')
      if (error.value) {
        toast.add({
          severity: 'error',
          summary: `Có lỗi xảy ra khi xóa điểm đến ${destination.name}`,
          life: 3000,
        })
        return
      }
      toast.add({
        severity: 'success',
        summary: `Xóa thành công điểm đến ${destination.name}`,
        life: 3000,
      })
      getListDestinations()
    },
  })
}
</script>
<template>
  <ConfirmPopup></ConfirmPopup>
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
          class="!shadow-lg border border-solid border-gray-200 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)] min-w-sm"
        >
          <template #header>
            <img alt="" :src="destination.images[0]" class="max-h-48 w-full" />
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
            <div class="m-0 max-h-96 max-w-96 truncate">
              {{ destination.description }}
            </div>
          </template>
          <template #footer>
            <div class="flex justify-center gap-4 mt-1">
              <router-link :to="`/destination/${destination.id}`">
                <Button
                  icon="pi pi-eye"
                  aria-label="Detail"
                  severity="info"
                  variant="text"
                />
              </router-link>

              <Button
                icon="pi pi-trash"
                aria-label="Delete"
                severity="danger"
                variant="text"
                @click="removeDestination($event, destination)"
              />
              <router-link :to="`/destination/edit/${destination.id}`">
                <Button
                  icon="pi pi-pen-to-square"
                  aria-label="Edit"
                  severity="warn"
                  variant="text"
                />
              </router-link>
            </div>
          </template>
        </Card>
      </template>
    </div>
  </div>
</template>
