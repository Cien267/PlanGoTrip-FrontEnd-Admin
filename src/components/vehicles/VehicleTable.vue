<script setup lang="ts">
import { ref, onMounted, inject, watch, type Ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useAxios } from '@/composables/useAxios'
import { URL_GET_VEHICLES, URL_DELETE_VEHICLE } from '@/constants/url'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import type { VehicleType } from '@/types'
import CreateOrUpdateModal from './CreateOrUpdateModal.vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  fuel_consumption: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// list vehicles
const vehicles = ref<VehicleType[]>()
const { data, error, loading, fetchData } = useAxios()
const getVehicleList = async () => {
  await fetchData(URL_GET_VEHICLES, 'GET')
  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi láy danh sách phương tiện',
      life: 3000,
    })
    return
  }
  vehicles.value = data.value?.data || []
}

onMounted(async () => {
  await getVehicleList()
})

// delete vehicle
const confirm = useConfirm()
const removeVehicle = (event: any, vehicle: VehicleType) => {
  confirm.require({
    target: event.currentTarget,
    message: `Bạn có chắc chắn muốn xóa phương tiện ${vehicle.name}?`,
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
      await fetchData(`${URL_DELETE_VEHICLE}/${vehicle.id}`, 'DELETE')
      if (error.value) {
        toast.add({
          severity: 'error',
          summary: `Có lỗi xảy ra khi xóa phương tiện ${vehicle.name}`,
          life: 3000,
        })
        return
      }
      toast.add({
        severity: 'success',
        summary: `Xóa thành công phương tiện ${vehicle.name}`,
        life: 3000,
      })
      switchRefetchingFlag()
    },
  })
}

// refetch vehicles
const refetchingFlag = inject<Ref<boolean>>('refetchingFlag', ref(false))
const switchRefetchingFlag = inject<() => void>(
  'switchRefetchingFlag',
  () => {},
)
watch(refetchingFlag, async () => {
  await getVehicleList()
})
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="card flex justify-center items-center">
    <DataTable
      v-model:filters="filters"
      :value="vehicles"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['name', 'email']"
    >
      <template #empty> Không tìm thấy phương tiện nào </template>
      <template #loading> Đang lấy dữ liệu phương tiện </template>
      <Column field="name" header="Tên" class="min-w-xs">
        <template #body="{ data }">
          {{ data.name }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Tìm theo tên"
          />
        </template>
      </Column>
      <Column field="image" header="Ảnh minh họa" class="min-w-xs">
        <template #body="{ data }">
          <img :src="data.image" alt="" class="w-14 h-auto" />
        </template>
        <template #filter> </template>
      </Column>
      <Column field="description" header="Mô tả" class="min-w-xs">
        <template #body="{ data }">
          {{ data.description }}
        </template>
        <template #filter="{}"> </template>
      </Column>

      <Column
        field="fuel_consumption"
        header="Mức tiêu thụ nhiên liệu"
        class="min-w-xs"
      >
        <template #body="{ data }">
          <span class="font-semibold text-sky-600">{{
            data.fuel_consumption
          }}</span>
          <span class="text-sm text-gray-400 pl-2">lít/100km</span>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
          />
        </template>
      </Column>
      <Column header="Action" class="flex gap-4 min-w-10">
        <template #body="{ data }">
          <create-or-update-modal
            :type="'update'"
            :vehicle="data"
          ></create-or-update-modal>
          <Button
            icon="pi pi-trash"
            @click="removeVehicle($event, data)"
            severity="danger"
            class="p-2"
            size="small"
            rounded
          ></Button>
        </template>
        <template #filter> </template>
      </Column>
    </DataTable>
  </div>
</template>
<style>
.p-datatable-column-filter-button svg {
  display: none;
}
</style>
