<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import DestinationForm from '@/components/destinations/DestinationForm.vue'
import DestinationElement from '@/components/destinations/DestinationElement.vue'
import { provide, ref } from 'vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

const refetchingFlag = ref(false)
const switchRefetchingFlag = () => {
  refetchingFlag.value = !refetchingFlag.value
}
provide('refetchingFlag', refetchingFlag)
provide('switchRefetchingFlag', switchRefetchingFlag)
</script>

<template>
  <DefaultLayout>
    <div class="p-10">
      <destination-form></destination-form>
      <Divider type="dashed" />
      <destination-element></destination-element>
    </div>
    <Teleport to="body">
      <Button
        icon="pi pi-save"
        label="Lưu"
        @click="{}"
        severity="success"
        class="!fixed bottom-10 right-10"
        size="large"
        rounded
      ></Button>
    </Teleport>
  </DefaultLayout>
</template>
