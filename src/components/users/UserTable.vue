<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from '@primevue/core/api'
import { useAxios } from '@/composables/useAxios'
import { URL_GET_USERS } from '@/constants/url'
import InputText from 'primevue/inputtext'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
})

const users = ref()
const { data, error, loading, fetchData } = useAxios()
onMounted(async () => {
  await fetchData(URL_GET_USERS, 'GET')
  if (error) {
    return
  }
  users.value = data.value
})
</script>

<template>
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
        <template #body="{}">
          <Button
            icon="pi pi-pen-to-square"
            @click="{}"
            severity="info"
            class="p-2"
            size="small"
            rounded
          ></Button>
          <Button
            icon="pi pi-trash"
            @click="{}"
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
