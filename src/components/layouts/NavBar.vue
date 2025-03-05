<script setup lang="ts">
import Menubar from 'primevue/menubar'
import ThemeSwitch from '@/components/common/ThemeSwitch.vue'
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import EntireScreenLoader from '@/components/common/EntireScreenLoader.vue'
import { useRouter } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const { error, loading, logout } = useAuth()
const router = useRouter()
const toast = useToast()
const items = ref([
  {
    label: '',
    icon: 'pi pi-user',
    items: [
      {
        label: 'Đăng xuất',
        icon: 'pi pi-sign-out',
        command: async () => {
          try {
            await logout()
            if (error.value) {
              toast.add({
                severity: 'error',
                summary: 'Có lỗi xảy ra',
                life: 3000,
              })
              return
            }
            router.push({ name: ROUTER_NAME_LIST.LOGIN_PAGE })
          } catch (e: any) {
            console.error(e)
          }
        },
      },
    ],
  },
])
</script>

<template>
  <entire-screen-loader v-if="loading"></entire-screen-loader>
  <Toast position="bottom-right" />
  <Menubar :model="[]" class="navbar-header-menu">
    <template #start>
      <i class="pi pi-apple px-2"></i>
    </template>
    <template #end>
      <theme-switch class="!px-4 inline-block"></theme-switch>
      <Menubar :model="items" class="!border-none h-6 hover:bg-none" />
    </template>
  </Menubar>
</template>
<style>
.navbar-header-menu .p-menubar-submenu {
  right: 0;
  min-width: 8rem;
}
.navbar-header-menu .p-menubar-item-content:hover,
.navbar-header-menu .p-menubar-item-content:active,
.navbar-header-menu .p-menubar-item-active > .p-menubar-item-content,
.navbar-header-menu .p-menubar-item.p-focus > .p-menubar-item-content {
  background: none !important;
}
.navbar-header-menu .p-menubar-item-label {
  font-size: 14px;
  font-weight: 500;
}
</style>
