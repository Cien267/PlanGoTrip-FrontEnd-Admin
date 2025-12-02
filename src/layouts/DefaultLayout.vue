<script setup lang="ts">
import NavBar from '@/components/layouts/NavBar.vue'
import Menu from '@/components/layouts/Menu.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const currentRoute = useRoute()
const classContainer = computed(() => {
  return `plangotrip-${String(currentRoute.name)}`
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
