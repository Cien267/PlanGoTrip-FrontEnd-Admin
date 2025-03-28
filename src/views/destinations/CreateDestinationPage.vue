<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DestinationForm from '@/components/destinations/DestinationForm.vue'
import DestinationElement from '@/components/destinations/DestinationElement.vue'
import { provide, ref } from 'vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import { useCreateOrUpdateDestination } from '@/composables/useCreateOrUpdateDestination'
import { transform } from '@/transformers/destination/createDestinationTransform'
import { useAxios } from '@/composables/useAxios'
import { URL_CREATE_DESTINATIONS } from '@/constants/url'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import EntireScreenLoader from '@/components/common/EntireScreenLoader.vue'
import { useRouter } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'

const refetchingFlag = ref(false)
const switchRefetchingFlag = () => {
  refetchingFlag.value = !refetchingFlag.value
}
provide('refetchingFlag', refetchingFlag)
provide('switchRefetchingFlag', switchRefetchingFlag)

// handle submit
const {
  dataDestination,
  attractionsList,
  accommodationsList,
  restaurantsList,
} = useCreateOrUpdateDestination()
const { loading, error, fetchData } = useAxios()
const submitCreateDestination = async () => {
  const dataRequest = transform(
    dataDestination,
    attractionsList.value,
    accommodationsList.value,
    restaurantsList.value,
  )
  try {
    await fetchData(URL_CREATE_DESTINATIONS, 'POST', dataRequest)

    if (error.value) {
      console.error(error.value)
      toast.add({
        severity: 'error',
        summary: 'Có lỗi xảy ra khi tạo điểm đến',
        life: 3000,
      })
      return
    }

    toast.add({
      severity: 'success',
      summary: 'Tạo điểm đến thành công',
      life: 3000,
    })
    const router = useRouter()
    router.push({ name: ROUTER_NAME_LIST.LIST_DESTINATION_PAGE })
  } catch (e: any) {
    console.error(e)
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi tạo điểm đến',
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
        icon="pi pi-save"
        label="Lưu"
        @click="submitCreateDestination"
        severity="success"
        class="!fixed bottom-10 right-10"
        size="large"
        rounded
      ></Button>
    </Teleport>
  </DefaultLayout>
</template>
