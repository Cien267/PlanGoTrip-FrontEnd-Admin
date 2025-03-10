<script setup lang="ts">
import { ref, onMounted, inject, watch, type Ref } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useAxios } from '@/composables/useAxios'
import { URL_GET_USERS, URL_DELETE_USER } from '@/constants/url'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import type { AdminType } from '@/types'
import CreateOrUpdateModal from './CreateOrUpdateModal.vue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

// list users
const users = ref<AdminType[]>()
const { data, error, loading, fetchData } = useAxios()
const getUserList = async () => {
  await fetchData(URL_GET_USERS, 'GET')
  if (error.value) {
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi láy danh sách user',
      life: 3000,
    })
    return
  }
  users.value = data.value?.data || []
}

onMounted(async () => {
  await getUserList()
})

// update user

// delete user
const confirm = useConfirm()
const removeUser = (event: any, user: AdminType) => {
  confirm.require({
    target: event.currentTarget,
    message: `Bạn có chắc chắn muốn xóa user ${user.name}?`,
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
      await fetchData(`${URL_DELETE_USER}/${user.id}`, 'DELETE')
      if (error.value) {
        toast.add({
          severity: 'error',
          summary: `Có lỗi xảy ra khi xóa user ${user.name}`,
          life: 3000,
        })
        return
      }
      toast.add({
        severity: 'success',
        summary: `Xóa thành công user ${user.name}`,
        life: 3000,
      })
      switchRefetchingFlag()
    },
  })
}

// refetch users
const refetchingFlag = inject<Ref<boolean>>('refetchingFlag', ref(false))
const switchRefetchingFlag = inject<() => void>(
  'switchRefetchingFlag',
  () => {},
)
watch(refetchingFlag, async () => {
  await getUserList()
})
</script>

<template>
  <ConfirmPopup></ConfirmPopup>
  <div class="card flex justify-center items-center">
    <DataTable
      v-model:filters="filters"
      :value="users"
      paginator
      :rows="10"
      dataKey="id"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['name', 'email']"
    >
      <template #empty> Không tìm thấy user nào </template>
      <template #loading> Đang lấy dữ liệu user </template>
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
      <Column field="email" header="Email" class="min-w-xs">
        <template #body="{ data }">
          {{ data.email }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            placeholder="Tìm theo email"
          />
        </template>
      </Column>
      <Column header="Action" class="flex gap-4 min-w-10">
        <template #body="{ data }">
          <create-or-update-modal
            :type="'update'"
            :user="data"
          ></create-or-update-modal>
          <Button
            icon="pi pi-trash"
            @click="removeUser($event, data)"
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
