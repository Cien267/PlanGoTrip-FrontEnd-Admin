<script setup lang="ts">
import { ref } from 'vue'
import Dock from 'primevue/dock'
import { useRouter } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'

const router = useRouter()
const items = ref([
  {
    label: 'Điểm đến',
    class: 'pi pi-map-marker',
    command: () => {
      router.push({ name: ROUTER_NAME_LIST.LIST_DESTINATION_PAGE })
    },
  },
  {
    label: 'Quản lý phương tiện',
    class: 'pi pi-car',
    command: () => {
      router.push({ name: ROUTER_NAME_LIST.VEHICLE_PAGE })
    },
  },
  {
    label: 'Quản lý người dùng',
    class: 'pi pi-users',
    command: () => {
      router.push({ name: ROUTER_NAME_LIST.USER_PAGE })
    },
  },
])
const onDockItemClick = (event: any, item: any) => {
  if (item.command) {
    item.command()
  }

  event.preventDefault()
}
</script>

<template>
  <div class="dock-window dock-advanced">
    <Dock :model="items">
      <template #item="{ item }">
        <a
          v-tooltip.top="item.label"
          href="#"
          class="shadow-sm p-dock-item-link rounded-lg bg-white dark:!bg-slate-700 flex items-center justify-center !cursor-pointer"
          @click="onDockItemClick($event, item)"
        >
          <i :class="item.class" class="!text-2xl"></i>
        </a>
      </template>
    </Dock>
  </div>
</template>
