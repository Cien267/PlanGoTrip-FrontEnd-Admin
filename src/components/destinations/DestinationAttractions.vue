<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { DESTINATION_ATTRACTION_CATEGORIES } from '@/constants/destinations'
import { ref } from 'vue'

const selectedCategory = ref()
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-4">
    <div
      class="shadow-lg rounded-lg sm:w-[calc(50%-0.5rem)] border border-gray-300 p-4 relative"
    >
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Tên</label>
          <InputText
            id="name"
            class="flex-auto w-[72%]"
            autocomplete="off"
            placeholder="Nhập tên điểm tham quan"
          />
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Phân loại</label>
          <Select
            v-model="selectedCategory"
            :options="DESTINATION_ATTRACTION_CATEGORIES"
            filter
            optionLabel="name"
            placeholder="Chọn"
            class="w-[72%]"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <img
                  :alt="slotProps.value.name"
                  :src="slotProps.value.icon"
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
                  :alt="slotProps.option.name"
                  :src="slotProps.option.icon"
                  class="mr-2"
                  style="width: 18px"
                />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Select>
        </div>
        <div class="flex items-center gap-1 mb-2 w-full">
          <label for="name" class="font-semibold w-[28%]">Mô tả</label>
          <Textarea autoResize rows="3" class="w-[72%]" />
        </div>
      </div>
      <Button
        icon="pi pi-minus !text-xs"
        severity="danger"
        rounded
        size="small"
        class="!absolute -top-2 -right-2 !h-[22px] !w-[20px]"
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
  />
</template>
