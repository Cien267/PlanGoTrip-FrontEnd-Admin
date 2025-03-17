<script setup lang="ts">
import { ref, onMounted, inject, watch, type Ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useAxios } from '@/composables/useAxios'
import {
  URL_GET_ACCOMMODATION_CATEGORIES,
  URL_DELETE_ACCOMMODATION_CATEGORY,
} from '@/constants/url'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import type { DestinationAccommodationCategoryType } from '@/types'
import CreateOrUpdateModal from './CreateOrUpdateCategoryModal.vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// list categories
const categories = ref<DestinationAccommodationCategoryType[]>()
const { data, error, loading, fetchData } = useAxios()
const getCategoriesList = async () => {
  await fetchData(URL_GET_ACCOMMODATION_CATEGORIES, 'GET')
  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi láy danh sách phân loại',
      life: 3000,
    })
    return
  }
  categories.value = data.value?.data || []
}

onMounted(async () => {
  await getCategoriesList()
})

// delete category
const confirm = useConfirm()
const removeCategory = (
  event: any,
  category: DestinationAccommodationCategoryType,
) => {
  confirm.require({
    target: event.currentTarget,
    message: `Bạn có chắc chắn muốn xóa phân loại ${category.name}?`,
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
      await fetchData(
        `${URL_DELETE_ACCOMMODATION_CATEGORY}/${category.id}`,
        'DELETE',
      )
      if (error.value) {
        toast.add({
          severity: 'error',
          summary: `Có lỗi xảy ra khi xóa phân loại ${category.name}`,
          life: 3000,
        })
        return
      }
      toast.add({
        severity: 'success',
        summary: `Xóa thành công phân loại ${category.name}`,
        life: 3000,
      })
      switchRefetchingFlag()
    },
  })
}

// refetch categories
const refetchingFlag = inject<Ref<boolean>>('refetchingFlag', ref(false))
const switchRefetchingFlag = inject<() => void>(
  'switchRefetchingFlag',
  () => {},
)
watch(refetchingFlag, async () => {
  await getCategoriesList()
})
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="card flex justify-center items-center">
    <DataTable
      v-model:filters="filters"
      :value="categories"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['name', 'email']"
    >
      <template #empty> Không tìm thấy phân loại nào </template>
      <template #loading> Đang lấy dữ liệu phân loại </template>
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
      <Column field="code" header="Code" class="min-w-xs">
        <template #body="{ data }">
          {{ data.code }}
        </template>
        <template #filter="{}"> </template>
      </Column>
      <Column field="description" header="Mô tả" class="min-w-xs">
        <template #body="{ data }">
          {{ data.description }}
        </template>
        <template #filter="{}"> </template>
      </Column>
      <Column field="image" header="Ảnh minh họa" class="min-w-xs">
        <template #body="{ data }">
          <img :src="data.image" alt="" class="w-14 h-auto" />
        </template>
        <template #filter> </template>
      </Column>
      <Column header="Action" class="flex gap-4 min-w-10">
        <template #body="{ data }">
          <create-or-update-modal
            :type="'update'"
            :category="data"
          ></create-or-update-modal>
          <Button
            icon="pi pi-trash"
            @click="removeCategory($event, data)"
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
