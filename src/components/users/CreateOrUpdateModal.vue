<script setup lang="ts">
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref, inject, computed } from 'vue'
import { useAxios } from '@/composables/useAxios'
import { URL_CREATE_USER, URL_UPDATE_USER } from '@/constants/url'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'

const { type = 'create', user = null } = defineProps(['type', 'user'])
const visible = ref(false)

const headerTitle = computed(() => {
  return `${type === 'create' ? 'Tạo' : 'Cập nhật'} user ${type === 'update' && user?.name ? user?.name : ''}`
})

const dataUser = ref({
  name: '',
  email: '',
  password: '',
})

if (user) dataUser.value = user

const toast = useToast()
const switchRefetchingFlag = inject<() => void>(
  'switchRefetchingFlag',
  () => {},
)
const { error, loading, fetchData } = useAxios()
const createOrUpdateUser = async () => {
  try {
    await fetchData(
      type === 'create' ? URL_CREATE_USER : `${URL_UPDATE_USER}/${user.id}`,
      type === 'create' ? 'POST' : 'PUT',
      dataUser.value,
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
  return type === 'create' ? 'pi pi-user-plus' : 'pi pi-pen-to-square'
})
const buttonSeverity = computed(() => {
  return type === 'create' ? 'primary' : 'info'
})
const buttonLabel = computed(() => {
  return type === 'create' ? 'Thêm user' : ''
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
  <Dialog
    v-model:visible="visible"
    modal
    :header="headerTitle"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24 w-[28%]">Name</label>
      <InputText
        id="username"
        class="flex-auto w-[72%]"
        autocomplete="off"
        v-model="dataUser.name"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24 w-[28%]">Email</label>
      <InputText
        id="email"
        class="flex-auto w-[72%]"
        autocomplete="off"
        v-model="dataUser.email"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24 w-[28%]">Password</label>
      <Password
        name="password"
        class="w-[72%]"
        toggleMask
        fluid
        v-model="dataUser.password"
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
        @click="createOrUpdateUser"
        :loading="loading"
      ></Button>
    </div>
  </Dialog>
</template>
