<script setup lang="ts">
import FileUpload from 'primevue/fileupload'
import { useAuth } from '@/composables/useAuth'
import { useToast } from 'primevue/usetoast'
import type { ResponseUploadType } from '@/types'
const toast = useToast()

const baseUrl = import.meta.env.VITE_BASE_URL
const { token } = useAuth()
const emit = defineEmits(['upload-file'])

const onBeforeSend = (event: any) => {
  event.xhr.setRequestHeader('Authorization', `Bearer ${token.value}`)
  return event
}
const onAdvancedUpload = (event: any) => {
  try {
    const result = JSON.parse(event.xhr.response)
    const dataEmit = result.data.map((item: ResponseUploadType) => {
      return item.url
    })
    emit('upload-file', dataEmit)
  } catch (error) {
    console.error(error)
  }
}
const onUploadError = (event: any) => {
  try {
    const error = JSON.parse(event.xhr.response)
    const msg = error.message || 'Có lỗi xảy ra khi upload file'
    toast.add({
      severity: 'error',
      summary: msg,
      life: 3000,
    })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <FileUpload
    name="images[]"
    :multiple="true"
    accept="image/*"
    :maxFileSize="1000000"
    :auto="false"
    :url="`${baseUrl}api/admin/upload-image`"
    @before-send="onBeforeSend"
    @upload="onAdvancedUpload($event)"
    @error="onUploadError($event)"
  >
    <template #empty>
      <div class="flex items-center justify-center flex-col">
        <i
          class="pi pi-cloud-upload !rounded-full !p-2 !text-4xl !text-muted-color"
        />
        <p class="mt-6 mb-0 text-sm text-gray-400">
          kéo thả file vào đây để upload.
        </p>
      </div>
    </template>
  </FileUpload>
</template>
