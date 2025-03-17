<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AccommodationCategoryCreate from '@/components/destinations/accommodations/AccommodationCategoryCreate.vue'
import AccommodationCategoriesTable from '@/components/destinations/accommodations/AccommodationCategoriesTable.vue'
import { provide, ref } from 'vue'

const refetchingFlag = ref(false)
const switchRefetchingFlag = () => {
  refetchingFlag.value = !refetchingFlag.value
}
provide('refetchingFlag', refetchingFlag)
provide('switchRefetchingFlag', switchRefetchingFlag)
</script>

<template>
  <DefaultLayout>
    <AccommodationCategoryCreate></AccommodationCategoryCreate>
    <AccommodationCategoriesTable></AccommodationCategoriesTable>
  </DefaultLayout>
</template>
