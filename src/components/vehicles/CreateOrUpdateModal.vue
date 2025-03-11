<script setup lang="ts">
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { ref, inject, computed } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { URL_CREATE_VEHICLE, URL_UPDATE_VEHICLE } from '@/constants/url'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'

const { type = 'create', vehicle = null } = defineProps(['type', 'vehicle'])
const visible = ref(false)
const uploadedImage = ref<string | ArrayBuffer | null>(null)

const headerTitle = computed(() => {
  return `${type === 'create' ? 'Tạo' : 'Cập nhật'} phương tiện ${type === 'update' && vehicle?.name ? vehicle?.name : ''}`
})

const dataVehicle = ref({
  name: '',
  image: '',
  description: '',
  fuel_consumption: 0,
})

if (vehicle) {
  dataVehicle.value = vehicle
  if (vehicle.image) {
    uploadedImage.value = vehicle.image
  }
}

const toast = useToast()
const switchRefetchingFlag = inject<() => void>(
  'switchRefetchingFlag',
  () => {},
)

// handle upload image
const onFileSelect = (event: any) => {
  const file = event.files[0]
  dataVehicle.value.image = file

  const reader = new FileReader()

  reader.onload = async e => {
    uploadedImage.value = (e.target as any).result
  }

  reader.readAsDataURL(file)
}

const { error, loading, fetchData } = useAxios()
const createOrUpdateVehicle = async () => {
  try {
    const formData = new FormData()
    formData.append('image', dataVehicle.value.image)
    formData.append('name', dataVehicle.value.name)
    formData.append('description', dataVehicle.value.description)
    formData.append(
      'fuel_consumption',
      String(dataVehicle.value.fuel_consumption),
    )
    await fetchData(
      type === 'create'
        ? URL_CREATE_VEHICLE
        : `${URL_UPDATE_VEHICLE}/${vehicle.id}`,
      'POST',
      formData,
      {
        headers: {},
      },
    )
    if (error.value) {
      toast.add({
        severity: 'error',
        summary: 'Có lỗi xảy ra',
        life: 3000,
      })
      return
    }
    visible.value = false
    switchRefetchingFlag()
    toast.add({
      severity: 'success',
      summary: `${type} thành công`,
      life: 3000,
    })
  } catch (e: any) {
    console.error(e)
  }
}

const buttonIcon = computed(() => {
  return type === 'create' ? 'pi pi-plus' : 'pi pi-pen-to-square'
})
const buttonSeverity = computed(() => {
  return type === 'create' ? 'primary' : 'info'
})
const buttonLabel = computed(() => {
  return type === 'create' ? 'Thêm vehicle' : ''
})
</script>

<template>
  <Button
    @click="visible = true"
    :icon="buttonIcon"
    :severity="buttonSeverity"
    size="small"
    class="p-2"
    :label="buttonLabel"
  ></Button>
  <Dialog v-model:visible="visible" modal :header="headerTitle">
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24 w-[28%]">Name</label>
      <InputText
        id="name"
        class="flex-auto w-[72%]"
        autocomplete="off"
        v-model="dataVehicle.name"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="description" class="font-semibold w-24 w-[28%]">Mô tả</label>
      <InputText
        id="description"
        class="flex-auto w-[72%]"
        autocomplete="off"
        v-model="dataVehicle.description"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="fuel_consumption" class="font-semibold w-24 w-[28%]"
        >Mức tiêu thụ nhiên liệu (lit/100km)</label
      >
      <InputNumber
        id="fuel_consumption"
        v-model="dataVehicle.fuel_consumption"
        class="flex-auto w-[72%]"
        inputId="integeronly"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="image" class="font-semibold w-24 w-[28%]">Ảnh minh họa</label>
      <FileUpload
        name="image[]"
        mode="basic"
        @select="onFileSelect"
        customUpload
        auto
        severity="secondary"
        class="p-button-outlined"
      />
      <img
        v-if="uploadedImage"
        :src="uploadedImage as string"
        alt="Image"
        class="shadow-md rounded-xl w-full sm:w-28"
        style="filter: grayscale(100%)"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button
        type="button"
        label="Lưu"
        @click="createOrUpdateVehicle"
        :loading="loading"
      ></Button>
    </div>
  </Dialog>
</template>
