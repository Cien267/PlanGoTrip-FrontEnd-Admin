<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ContextMenu from 'primevue/contextmenu'
import { ref } from 'vue'

const backgroundInput = ref()
const handleFileUpload = (e: any) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      const containers: any = document.getElementsByClassName('plangotrip-home')
      if (containers.length > 0) {
        containers[0].style.backgroundImage = `url('${e?.target?.result}')`
      }
    }
    reader.readAsDataURL(file)
  }
}
const items = ref([
  {
    label: 'Reload',
    icon: 'pi pi-refresh',
    command: () => {
      window.location.reload()
    },
  },
  {
    label: 'Đổi hình nền',
    icon: 'pi pi-image',
    command: () => {
      backgroundInput.value.click()
    },
  },
])
</script>

<template>
  <DefaultLayout>
    <h1>Home Page</h1>
    <input
      type="file"
      class="hidden"
      ref="backgroundInput"
      accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg+xml"
      @change="handleFileUpload"
    />
    <ContextMenu global :model="items" />
  </DefaultLayout>
</template>
