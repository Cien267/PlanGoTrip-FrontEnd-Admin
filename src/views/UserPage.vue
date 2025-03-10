<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UserCreate from '@/components/users/UserCreate.vue'
import UserTable from '@/components/users/UserTable.vue'
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
    <UserCreate></UserCreate>
    <UserTable></UserTable>
  </DefaultLayout>
</template>
