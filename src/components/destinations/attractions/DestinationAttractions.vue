<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import CustomFileUpload from '../../common/CustomFileUpload.vue'
import { DAY_PERIODS } from '@/constants/destinations'
import { ref, onMounted } from 'vue'
import Badge from 'primevue/badge'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import { useAxios } from '@/composables/useAxios'
import { URL_GET_ATTRACTION_CATEGORIES } from '@/constants/url'
import { useCreateOrUpdateDestination } from '@/composables/useCreateOrUpdateDestination'

const { data, error, fetchData } = useAxios()
const attractionCategories = ref()

const getListCategories = async () => {
  await fetchData(URL_GET_ATTRACTION_CATEGORIES, 'GET')

  if (error.value) {
    console.error(error.value)
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi láy danh sách phân loại',
      life: 3000,
    })
    return
  }
  attractionCategories.value = data.value.data || []
}

onMounted(async () => {
  await getListCategories()
})

const {
  attractionsList,
  addAttraction,
  removeAttraction,
  uploadFileAttraction,
} = useCreateOrUpdateDestination()
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-4">
    <div
      v-for="(attraction, index) in attractionsList"
      :key="attraction.uuid"
      class="shadow-[0px_5px_15px_rgba(144,238,144,1)] rounded-lg w-full flex gap-4 flex-wrap border border-gray-300 p-10 relative"
    >
      <div
        class="flex flex-col justify-start flex-wrap gap-4 sm:w-[calc(50%-0.5rem)]"
      >
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Tên</label>
          <InputText
            id="name"
            class="flex-auto w-[72%]"
            autocomplete="off"
            placeholder="Nhập tên điểm tham quan"
            v-model="attraction.name"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Phân loại</label>
          <Select
            v-model="attraction.selectedAttractionCategory"
            :options="attractionCategories"
            filter
            optionLabel="name"
            placeholder="Chọn"
            class="w-[72%]"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <img
                  v-if="slotProps.value.image"
                  :alt="slotProps.value.name"
                  :src="slotProps.value.image"
                  class="mr-2"
                  style="width: 18px"
                />
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <img
                  v-if="slotProps.option.image"
                  :alt="slotProps.option.name"
                  :src="slotProps.option.image"
                  class="mr-2"
                  style="width: 18px"
                />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="phone" class="font-semibold w-[28%]">Số điện thoại</label>
          <InputNumber
            id="phone"
            class="flex-auto w-[72%]"
            inputId="withoutgrouping"
            :useGrouping="false"
            placeholder="Nhập sđt"
            v-model="attraction.phone"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Địa chỉ</label>
          <InputText
            id="address"
            class="flex-auto w-[72%]"
            autocomplete="off"
            placeholder="Nhập địa chỉ chi tiết"
            v-model="attraction.address"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="duration" class="font-semibold w-[28%]"
            >Thời gian tham quan dự kiến</label
          >
          <InputNumber
            v-model="attraction.estimatedDuration"
            inputId="duration"
            class="flex-auto w-[10%]"
            autocomplete="off"
            suffix=" tiếng"
            :min="0"
            :max="24"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="description" class="font-semibold w-[28%]">Mô tả</label>
          <Textarea
            autoResize
            rows="3"
            class="w-[72%]"
            v-model="attraction.description"
          />
        </div>
      </div>
      <div
        class="flex flex-col justify-start flex-wrap gap-4 sm:w-[calc(50%-0.5rem)]"
      >
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="price_range" class="font-semibold w-[28%]"
            >Khoảng giá</label
          >
          <div class="w-[72%] flex justify-between items-center gap-2">
            <InputNumber
              v-model="attraction.startPriceRange"
              inputId="opening_hour"
              class="flex-auto w-[10%]"
              autocomplete="off"
              prefix="Từ "
              suffix=" đ"
            />

            <InputNumber
              v-model="attraction.endPriceRange"
              inputId="closing_hour"
              class="flex-auto w-[10%]"
              autocomplete="off"
              prefix="Đến "
              suffix=" đ"
            />
          </div>
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="opening_hours" class="font-semibold w-[28%]"
            >Giờ mở cửa</label
          >
          <div class="w-[72%] flex justify-between items-center gap-2">
            <div class="relative w-1/2">
              <InputNumber
                v-model="attraction.openingHour"
                inputId="opening_hour"
                class="flex-auto w-full"
                autocomplete="off"
                prefix="Từ "
                :min="0"
                :max="23"
              />
              <Select
                v-model="attraction.selectedOpeningPeriod"
                :options="DAY_PERIODS"
                optionLabel="name"
                class="!absolute right-0"
              />
            </div>
            <div class="relative w-1/2">
              <InputNumber
                v-model="attraction.closingHour"
                inputId="closing_hour"
                class="flex-auto w-full"
                autocomplete="off"
                prefix="Đến "
                :min="0"
                :max="23"
              />
              <Select
                v-model="attraction.selectedClosingPeriod"
                :options="DAY_PERIODS"
                optionLabel="name"
                class="!absolute right-0"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="website" class="font-semibold w-[28%]">Website</label>
          <InputText
            id="website"
            class="flex-auto w-[72%]"
            autocomplete="off"
            placeholder="https://example.com"
            v-model="attraction.websiteUrl"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full upload-multiple-images">
          <label for="image" class="font-semibold w-[28%]">Ảnh</label>
          <CustomFileUpload
            @upload-file="files => uploadFileAttraction(files, attraction.uuid)"
          ></CustomFileUpload>
        </div>
      </div>
      <Badge
        :value="index + 1"
        severity="success"
        class="!absolute -top-2 -left-2"
      ></Badge>
      <Button
        icon="pi pi-minus !text-xs"
        severity="danger"
        rounded
        size="small"
        class="!absolute -top-2 -right-2 !h-[22px] !w-[20px]"
        @click="removeAttraction(attraction.uuid)"
      />
    </div>
  </div>
  <Button
    icon="pi pi-plus"
    severity="contrast"
    rounded
    variant="outlined"
    size="small"
    class="mt-4"
    @click="addAttraction"
  />
</template>
