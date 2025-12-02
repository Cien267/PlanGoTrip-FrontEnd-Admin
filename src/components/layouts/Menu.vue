<script setup lang="ts">
import { ref } from 'vue'
import Dock from 'primevue/dock'
import { useRouter } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'

const router = useRouter()
const items = ref([
  {
    label: 'Điểm đến',
    icon: '📍',
    command: () => {
      router.push({ name: ROUTER_NAME_LIST.LIST_DESTINATION_PAGE })
    },
  },
  {
    label: 'Lịch trình',
    icon: '🗺️',
    command: () => {
      router.push({ name: ROUTER_NAME_LIST.LIST_ITINERARY_PAGE })
    },
  },
  {
    label: 'Phương tiện',
    icon: '🛵',
    command: () => {
      router.push({ name: ROUTER_NAME_LIST.VEHICLE_PAGE })
    },
  },
  {
    label: 'Người dùng',
    icon: '🫂',
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
          class="shadow-lg border border-gray-50 p-dock-item-link rounded-lg bg-white dark:!bg-slate-700 flex items-center justify-center !cursor-pointer"
          @click="onDockItemClick($event, item)"
        >
          <span class="!text-2xl">{{ item.icon }}</span>
        </a>
      </template>
    </Dock>
  </div>
</template>
<style>
.p-dock-list-container {
  backdrop-filter: blur(10px);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 20px !important;
  border: none !important;
}
</style>
