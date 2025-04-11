<script setup lang="ts">
import Fieldset from 'primevue/fieldset'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { ref } from 'vue'
import CustomFileUpload from '../common/CustomFileUpload.vue'
import { useCreateOrUpdateDestination } from '@/composables/useCreateOrUpdateDestination'

const { dataDestination, uploadFileDestination, removeFileDestination } =
  useCreateOrUpdateDestination()

const selectedLocation = ref(null)
const locations = ref([])
const selectedWard = ref(null)
const wards = ref([])
</script>
<template>
  <div class="card destination-create-form shadow-sm">
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
              v-model="dataDestination.full_address"
              placeholder="Nhập địa chỉ"
            />
          </div>
          <div class="flex items-center gap-1 mb-2 w-full">
            <label for="name" class="font-semibold w-[28%]">Mô tả</label>
            <Textarea
              v-model="dataDestination.description"
              autoResize
              rows="3"
              class="w-[72%]"
            />
          </div>
        </div>
        <div
          class="flex justify-center items-center w-1/2 upload-multiple-images"
        >
          <CustomFileUpload
            :uploaded-images="
              dataDestination.images.map(image => image.image_url)
            "
            @upload-file="uploadFileDestination"
            @remove-image="removeFileDestination"
          ></CustomFileUpload>
        </div>
      </div>
    </Fieldset>
  </div>
</template>
