<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DestinationForm from '@/components/destinations/DestinationForm.vue'
import DestinationElement from '@/components/destinations/DestinationElement.vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useCreateOrUpdateDestination } from '@/composables/useCreateOrUpdateDestination'
import { transform } from '@/transformers/destination/createDestinationTransform'
import { useAxios } from '@/composables/useAxios'
import { URL_UPDATE_DESTINATION, URL_DETAIL_DESTINATION } from '@/constants/url'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import EntireScreenLoader from '@/components/common/EntireScreenLoader.vue'
import { useRouter, useRoute } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'

const router = useRouter()
const route = useRoute()

// handle submit
const {
  dataDestination,
  attractionsList,
  accommodationsList,
  restaurantsList,
  resetData,
  setupData,
} = useCreateOrUpdateDestination()
resetData()

const { loading, error, fetchData, data } = useAxios()

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
      setupData(data.value.data ?? {})
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

const submitUpdateDestination = async () => {
  const dataRequest = transform(
    dataDestination,
    attractionsList.value,
    accommodationsList.value,
    restaurantsList.value,
  )
  try {
    await fetchData(
      `${URL_UPDATE_DESTINATION}${dataDestination.id}`,
      'PUT',
      dataRequest,
    )

    if (error.value) {
      console.error(error.value)
      toast.add({
        severity: 'error',
        summary: 'Có lỗi xảy ra khi cập nhật điểm đến',
        life: 3000,
      })
      return
    }

    toast.add({
      severity: 'success',
      summary: 'Cập nhật điểm đến thành công',
      life: 3000,
    })
    router.push({ name: ROUTER_NAME_LIST.LIST_DESTINATION_PAGE })
  } catch (e: any) {
    console.error(e)
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi cập nhật điểm đến',
      life: 3000,
    })
  }
}
</script>

<template>
  <DefaultLayout>
    <entire-screen-loader v-if="loading"></entire-screen-loader>
    <div class="p-10">
      <destination-form></destination-form>
      <Divider type="dashed" />
      <destination-element></destination-element>
    </div>
    <Teleport to="body">
      <Button
        icon="pi pi-pencil"
        label="Cập nhật"
        @click="submitUpdateDestination"
        severity="success"
        class="!fixed bottom-10 right-10"
        size="large"
        rounded
      ></Button>
    </Teleport>
  </DefaultLayout>
</template>
