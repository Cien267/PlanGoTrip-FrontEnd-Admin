<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="flex justify-between items-center flex-wrap gap-4">
    <div
      class="shadow-lg rounded-lg sm:w-[calc(50%-0.5rem)] border border-gray-300 p-4"
    ></div>
  </div>
  <Button
    icon="pi pi-plus"
    severity="contrast"
    rounded
    variant="outlined"
    size="small"
    class="mt-4"
  />
</template>
