<script setup lang="ts">
import { ref } from 'vue'
import Dock from 'primevue/dock'
import { useRouter } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'

const router = useRouter()
const items = ref([
  {
    label: 'Finder',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/finder.svg',
    command: () => {},
  },
  {
    label: 'Terminal',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/terminal.svg',
    command: () => {},
  },
  {
    label: 'App Store',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/appstore.svg',
    command: () => {},
  },
  {
    label: 'Safari',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/safari.svg',
    command: () => {},
  },
  {
    label: 'Photos',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/photos.svg',
    command: () => {},
  },
  {
    label: 'GitHub',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/github.svg',
  },
  {
    label: 'User',
    icon: '../../src/assets/images/android.svg',
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
          class="p-dock-item-link"
          @click="onDockItemClick($event, item)"
        >
          <img
            :alt="item.label as string"
            :src="item.icon"
            class="w-full cursor-pointer"
          />
        </a>
      </template>
    </Dock>
  </div>
</template>
