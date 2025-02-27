<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import ColorPicker from 'primevue/colorpicker'

const color = ref()
</script>

<template>
  <ColorPicker v-model="color" inline />

  <RouterView />
</template>

<style scoped></style>
