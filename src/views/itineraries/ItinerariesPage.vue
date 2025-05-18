<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ItinerariesList from '@/components/itineraries/ItinerariesList.vue'
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
    <ItinerariesList></ItinerariesList>
    <router-view></router-view>
  </DefaultLayout>
</template>
