<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AttractionCategoryCreate from '@/components/destinations/attractions/AttractionCategoryCreate.vue'
import AttractionCategoriesTable from '@/components/destinations/attractions/AttractionCategoriesTable.vue'
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
    <AttractionCategoryCreate></AttractionCategoryCreate>
    <AttractionCategoriesTable></AttractionCategoriesTable>
  </DefaultLayout>
</template>
