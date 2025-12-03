<script setup lang="ts">
import NavBar from '@/components/layouts/NavBar.vue'
import Menu from '@/components/layouts/Menu.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { ROUTER_NAME_LIST } from '@/constants/routers'

const currentRoute = useRoute()
const classContainer = computed(() => {
  const currentRouteCode =
    currentRoute.name === ROUTER_NAME_LIST.HOME_PAGE ? 'home' : ''
  return `plangotrip-${String(currentRouteCode)}`
})
</script>

<template>
  <div :class="['plangotrip-container', classContainer]">
    <div class="card plangotrip-layout">
      <nav-bar></nav-bar>
      <slot></slot>
      <div class="fixed h-2 bottom-0 w-full">
        <Menu class="fixed bottom-2 w-full"></Menu>
      </div>
    </div>
  </div>
</template>
