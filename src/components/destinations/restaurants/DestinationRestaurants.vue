<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import InputNumber from 'primevue/inputnumber'
import CustomFileUpload from '../../common/CustomFileUpload.vue'
import { DAY_PERIODS } from '@/constants/destinations'
import { ref, watch, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { RestaurantType } from '@/types'
import Badge from 'primevue/badge'
import { useToast } from 'primevue/usetoast'
const toast = useToast()
import { useAxios } from '@/composables/useAxios'
import { URL_GET_RESTAURANT_CATEGORIES } from '@/constants/url'

const { data, error, fetchData } = useAxios()
const restaurantCategories = ref()

const getListCategories = async () => {
  await fetchData(URL_GET_RESTAURANT_CATEGORIES, 'GET')

  if (error.value) {
    console.error(error.value)
    toast.add({
      severity: 'error',
      summary: 'Có lỗi xảy ra khi láy danh sách phân loại',
      life: 3000,
    })
    return
  }
  restaurantCategories.value = data.value.data || []
}

onMounted(async () => {
  await getListCategories()
})
const restaurantsList = ref<RestaurantType[]>([
  {
    uuid: uuidv4(),
    name: '',
    selectedRestaurantCategory: '',
    phone: 0,
    description: '',
    address: '',
    openingTime: 0,
    closingTime: 0,
    openingPeriod: {
      name: 'AM',
      value: 'am',
    },
    closingPeriod: {
      name: 'AM',
      value: 'am',
    },
    startPriceRange: 0,
    endPriceRange: 0,
    rating: 0,
    websiteUrl: '',
    menu: '',
    images: [],
  },
])

const addAttraction = () => {
  restaurantsList.value.push({
    uuid: uuidv4(),
    name: '',
    selectedRestaurantCategory: '',
    phone: 0,
    description: '',
    address: '',
    openingTime: 0,
    closingTime: 0,
    openingPeriod: {
      name: 'AM',
      value: 'am',
    },
    closingPeriod: {
      name: 'AM',
      value: 'am',
    },
    startPriceRange: 0,
    endPriceRange: 0,
    rating: 0,
    websiteUrl: '',
    menu: '',
    images: [],
  })
}
const removeRestaurant = (uuid: string) => {
  const index = restaurantsList.value.findIndex(item => item.uuid === uuid)
  if (index !== -1) {
    restaurantsList.value.splice(index, 1)
  }
}

const uploadFile = (images: any[], uuid: string) => {
  const index = restaurantsList.value.findIndex(item => item.uuid === uuid)
  if (index !== -1) {
    restaurantsList.value[index].images = images
  }
}

watch(
  () => restaurantsList.value,
  () => {
    console.log('========', restaurantsList.value)
  },
  { deep: true },
)
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-4">
    <div
      v-for="(restaurant, index) in restaurantsList"
      :key="restaurant.uuid"
      class="shadow-[0px_5px_15px_rgba(173,216,230,1)] rounded-lg w-full flex gap-4 flex-wrap border border-gray-300 p-10 relative"
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
            placeholder="Nhập tên điểm ăn uống"
            v-model="restaurant.name"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Phân loại</label>
          <Select
            v-model="restaurant.selectedRestaurantCategory"
            :options="restaurantCategories"
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
            v-model="restaurant.phone"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Địa chỉ</label>
          <InputText
            id="address"
            class="flex-auto w-[72%]"
            autocomplete="off"
            placeholder="Nhập địa chỉ chi tiết"
            v-model="restaurant.address"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="opening_hours" class="font-semibold w-[28%]"
            >Giờ mở cửa</label
          >
          <div class="w-[72%] flex justify-between items-center gap-2">
            <div class="relative w-1/2">
              <InputNumber
                v-model="restaurant.openingTime"
                inputId="opening_hour"
                class="flex-auto w-full"
                autocomplete="off"
                prefix="Check in: "
                :min="0"
                :max="23"
              />
              <Select
                v-model="restaurant.openingPeriod"
                :options="DAY_PERIODS"
                optionLabel="name"
                class="!absolute right-0"
              />
            </div>
            <div class="relative w-1/2">
              <InputNumber
                v-model="restaurant.closingTime"
                inputId="closing_hour"
                class="flex-auto w-full"
                autocomplete="off"
                prefix="Check out: "
                :min="0"
                :max="23"
              />
              <Select
                v-model="restaurant.closingPeriod"
                :options="DAY_PERIODS"
                optionLabel="name"
                class="!absolute right-0"
              />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="price_range" class="font-semibold w-[28%]"
            >Khoảng giá</label
          >
          <div class="w-[72%] flex justify-between items-center gap-2">
            <InputNumber
              v-model="restaurant.startPriceRange"
              inputId="opening_hour"
              class="flex-auto w-[10%]"
              autocomplete="off"
              prefix="Từ "
              suffix=" đ"
            />

            <InputNumber
              v-model="restaurant.endPriceRange"
              inputId="closing_hour"
              class="flex-auto w-[10%]"
              autocomplete="off"
              prefix="Đến "
              suffix=" đ"
            />
          </div>
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="price_range" class="font-semibold w-[28%]"
            >Đánh giá</label
          >
          <InputNumber
            v-model="restaurant.rating"
            inputId="rating"
            class="flex-auto w-[72%]"
            autocomplete="off"
            suffix=" ★"
          />
        </div>
      </div>
      <div
        class="flex flex-col justify-start flex-wrap gap-4 sm:w-[calc(50%-0.5rem)]"
      >
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="website" class="font-semibold w-[28%]">Website</label>
          <InputText
            id="website"
            class="flex-auto w-[72%]"
            autocomplete="off"
            placeholder="https://example.com"
            v-model="restaurant.websiteUrl"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="description" class="font-semibold w-[28%]">Menu</label>
          <Textarea
            autoResize
            rows="3"
            class="w-[72%]"
            v-model="restaurant.menu"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="description" class="font-semibold w-[28%]">Mô tả</label>
          <Textarea
            autoResize
            rows="3"
            class="w-[72%]"
            v-model="restaurant.description"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full upload-multiple-images">
          <label for="image" class="font-semibold w-[28%]">Ảnh</label>
          <CustomFileUpload
            @upload-file="files => uploadFile(files, restaurant.uuid)"
          ></CustomFileUpload>
        </div>
      </div>
      <Badge
        :value="index + 1"
        severity="info"
        class="!absolute -top-2 -left-2"
      ></Badge>
      <Button
        icon="pi pi-minus !text-xs"
        severity="danger"
        rounded
        size="small"
        class="!absolute -top-2 -right-2 !h-[22px] !w-[20px]"
        @click="removeRestaurant(restaurant.uuid)"
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
