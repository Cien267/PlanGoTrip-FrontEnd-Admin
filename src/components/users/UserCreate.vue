<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import Password from 'primevue/password'

const visible = ref(false)
</script>

<template>
  <div class="flex justify-center items-center py-10">
    <Button
      icon="pi pi-user-plus"
      @click="visible = true"
      severity="primary"
      size="small"
      label="Thêm user"
    ></Button>
    <Dialog
      v-model:visible="visible"
      modal
      header="Tạo user"
      :style="{ width: '25rem' }"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24 w-[28%]">Name</label>
        <InputText id="username" class="flex-auto w-[72%]" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24 w-[28%]">Email</label>
        <InputText id="email" class="flex-auto w-[72%]" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="email" class="font-semibold w-24 w-[28%]">Password</label>
        <Password name="password" class="w-[72%]" toggleMask fluid />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="visible = false"
        ></Button>
        <Button type="button" label="Save" @click="visible = false"></Button>
      </div>
    </Dialog>
  </div>
</template>
