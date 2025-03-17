<script setup lang="ts">
import CreateOrUpdateModal from './CreateOrUpdateCategoryModal.vue'
</script>

<template>
  <div class="flex justify-center items-center py-10">
    <create-or-update-modal :type="'create'"></create-or-update-modal>
  </div>
</template>
