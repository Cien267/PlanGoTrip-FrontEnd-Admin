<script setup lang="ts">
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { ref, inject, computed } from 'vue'
import { useAxios } from '@/composables/useAxios'
import {
  URL_CREATE_ATTRACTION_CATEGORY,
  URL_UPDATE_ATTRACTION_CATEGORY,
} from '@/constants/url'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import FileUpload from 'primevue/fileupload'

const { type = 'create', category = null } = defineProps(['type', 'category'])
const visible = ref(false)
const uploadedImage = ref<string | ArrayBuffer | null>(null)

const headerTitle = computed(() => {
  return `${type === 'create' ? 'Tạo' : 'Cập nhật'} phân loại ${type === 'update' && category?.name ? category?.name : ''}`
})

const dataCategory = ref({
  name: '',
  code: '',
  image: '',
  description: '',
})

if (category) {
  dataCategory.value = category
  if (category.image) {
    uploadedImage.value = category.image
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
  dataCategory.value.image = file

  const reader = new FileReader()

  reader.onload = async e => {
    uploadedImage.value = (e.target as any).result
  }

  reader.readAsDataURL(file)
}

const { error, loading, fetchData } = useAxios()
const createOrUpdateCategory = async () => {
  try {
    const formData = new FormData()
    formData.append('image', dataCategory.value.image)
    formData.append('name', dataCategory.value.name)
    formData.append('description', dataCategory.value.description)
    formData.append('code', dataCategory.value.code)
    await fetchData(
      type === 'create'
        ? URL_CREATE_ATTRACTION_CATEGORY
        : `${URL_UPDATE_ATTRACTION_CATEGORY}/${category.id}`,
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
  return type === 'create' ? 'Thêm phân loại' : ''
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
      <label for="name" class="font-semibold w-24 w-[28%]">Tên</label>
      <InputText
        id="name"
        class="flex-auto w-[72%]"
        autocomplete="off"
        v-model="dataCategory.name"
      />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="code" class="font-semibold w-24 w-[28%]">Code</label>
      <InputText
        id="code"
        class="flex-auto w-[72%]"
        autocomplete="off"
        v-model="dataCategory.code"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="description" class="font-semibold w-24 w-[28%]">Mô tả</label>
      <InputText
        id="description"
        class="flex-auto w-[72%]"
        autocomplete="off"
        v-model="dataCategory.description"
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
        @click="createOrUpdateCategory"
        :loading="loading"
      ></Button>
    </div>
  </Dialog>
</template>
