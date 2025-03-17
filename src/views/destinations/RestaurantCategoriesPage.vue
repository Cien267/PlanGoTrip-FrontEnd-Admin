<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import RestaurantCategoryCreate from '@/components/destinations/restaurants/RestaurantCategoryCreate.vue'
import RestaurantCategoriesTable from '@/components/destinations/restaurants/RestaurantCategoriesTable.vue'
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
    <RestaurantCategoryCreate></RestaurantCategoryCreate>
    <RestaurantCategoriesTable></RestaurantCategoriesTable>
  </DefaultLayout>
</template>
