<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import UserCreate from '@/components/users/UserCreate.vue'
import UserTable from '@/components/users/UserTable.vue'
</script>

<template>
  <DefaultLayout>
    <UserCreate></UserCreate>
    <UserTable></UserTable>
  </DefaultLayout>
</template>
