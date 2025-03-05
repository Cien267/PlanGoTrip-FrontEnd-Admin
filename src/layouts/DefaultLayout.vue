<script setup lang="ts">
import NavBar from '@/components/layouts/NavBar.vue'
import Menu from '@/components/layouts/Menu.vue'
</script>

<template>
  <div class="plangotrip-container">
    <div class="card plangotrip-layout">
      <nav-bar></nav-bar>
      <slot></slot>
      <Menu></Menu>
    </div>
  </div>
</template>
