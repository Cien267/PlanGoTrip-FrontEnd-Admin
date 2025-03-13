<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import Avatar from 'primevue/avatar'
import DestinationAccommodations from './DestinationAccommodations.vue'
import DestinationAttractions from './DestinationAttractions.vue'
import DestinationRestaurants from './DestinationRestaurants.vue'
</script>

<template>
  <div
    class="w-full flex justify-center items-center create-destination-element"
  >
    <Tabs value="0" class="w-full">
      <TabList>
        <Tab value="attractions" as="div" class="flex items-center gap-2">
          <Avatar image="/src/assets/images/circus.svg" shape="circle" />
          <span class="font-bold whitespace-nowrap">Điểm đến thu hút</span>
        </Tab>
        <Tab value="accommodations" as="div" class="flex items-center gap-2">
          <Avatar image="/src/assets/images/hotel.svg" shape="circle" />
          <span class="font-bold whitespace-nowrap">Nơi trú</span>
        </Tab>
        <Tab value="restaurants" as="div" class="flex items-center gap-2">
          <Avatar image="/src/assets/images/restaurant.svg" shape="circle" />
          <span class="font-bold whitespace-nowrap">Điểm ăn uống</span>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="attractions" as="p" class="m-0">
          <DestinationAttractions></DestinationAttractions>
        </TabPanel>
        <TabPanel value="accommodations" as="p" class="m-0">
          <DestinationAccommodations></DestinationAccommodations>
        </TabPanel>
        <TabPanel value="restaurants" as="p" class="m-0">
          <DestinationRestaurants></DestinationRestaurants>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
<style>
.create-destination-element .p-tablist .p-tablist-tab-list {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
