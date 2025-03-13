<script setup lang="ts">
import Fieldset from 'primevue/fieldset'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import { reactive } from 'vue'
import FileUpload from 'primevue/fileupload'
import Select from 'primevue/select'
import { ref } from 'vue'

const dataDestination = reactive({
  name: '',
  province_id: 0,
  district_id: 0,
  ward_id: 0,
  full_address: '',
  description: '',
})
const selectedLocation = ref(null)
const locations = ref([])
const selectedWard = ref(null)
const wards = ref([])
</script>
<template>
  <div class="card destination-create-form">
    <Fieldset>
      <template #legend>
        <div class="flex items-center pl-2">
          <Avatar image="/src/assets/images/forest.svg" shape="circle" />
          <span class="font-bold p-2">Điểm đến</span>
        </div>
      </template>
      <div class="flex gap-2">
        <div class="flex justify-between items-center flex-wrap gap-4 w-1/2">
          <div class="flex items-center gap-1 mb-2 w-full">
            <label for="name" class="font-semibold w-[28%]">Tên</label>
            <InputText
              id="name"
              class="flex-auto w-[72%]"
              autocomplete="off"
              v-model="dataDestination.name"
              placeholder="Nhập tên điểm đến"
            />
          </div>
          <div class="flex items-center gap-1 mb-2 w-full">
            <label for="name" class="font-semibold w-[28%]"
              >Tỉnh/TP - Quận/Huyện</label
            >
            <Select
              v-model="selectedLocation"
              :options="locations"
              filter
              optionLabel="name"
              placeholder="Chọn Tỉnh/TP - Quận/Huyện"
              class="w-[72%]"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="flex items-center gap-1 mb-2 w-full">
            <label for="name" class="font-semibold w-[28%]">Phường/Xã</label>
            <Select
              v-model="selectedWard"
              :options="wards"
              filter
              optionLabel="name"
              placeholder="Chọn Phường/Xã"
              class="w-[72%]"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Select>
          </div>
          <div class="flex items-center gap-1 mb-2 w-full">
            <label for="name" class="font-semibold w-[28%]"
              >Địa chỉ đầy đủ</label
            >
            <InputText
              id="name"
              class="flex-auto w-[72%]"
              autocomplete="off"
              v-model="dataDestination.name"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
        <div class="flex justify-center items-center w-1/2">
          <FileUpload
            name="destinationImages[]"
            :multiple="true"
            accept="image/*"
            :maxFileSize="1000000"
            :auto="false"
          >
            <template #empty>
              <div class="flex items-center justify-center flex-col">
                <i
                  class="pi pi-cloud-upload !rounded-full !p-2 !text-4xl !text-muted-color"
                />
                <p class="mt-6 mb-0 text-sm text-gray-400">
                  Drag and drop files to here to upload.
                </p>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
    </Fieldset>
  </div>
</template>
<style>
.destination-create-form .p-fileupload-content {
  max-height: 10rem;
  max-width: 36rem;
  overflow-x: hidden;
  overflow-y: auto;
}
.destination-create-form .p-fileupload-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.destination-create-form .p-fileupload-upload-button,
.destination-create-form .p-fileupload-cancel-button {
  display: none;
}
</style>
