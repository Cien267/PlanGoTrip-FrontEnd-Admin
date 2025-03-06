<script setup lang="ts">
import NavBar from '@/components/layouts/NavBar.vue'
import Menu from '@/components/layouts/Menu.vue'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'

const currentRoute = useRoute()
const classContainer = computed(() => {
  return `plangotrip-${String(currentRoute.name)}`
})

const showMenu = ref(false)
</script>

<template>
  <div :class="classContainer">
    <div class="card plangotrip-layout">
      <nav-bar></nav-bar>
      <slot></slot>
      <div
        class="fixed h-2 bottom-0 w-full"
        @mouseover="showMenu = true"
        @mouseleave="showMenu = false"
      >
        <Transition name="slide-fade">
          <Menu v-if="showMenu" class="fixed bottom-2 w-full"></Menu>
        </Transition>
      </div>
    </div>
  </div>
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
