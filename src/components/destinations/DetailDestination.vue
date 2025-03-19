<script setup lang="ts">
import OrganizationChart from 'primevue/organizationchart'
import Drawer from 'primevue/drawer'
import { ref } from 'vue'

const data = ref({
  key: '0',
  type: 'destination',
  styleClass:
    'text-white rounded-lg shadow-lg cursor-pointer hover:!bg-sky-100',
  data: {
    image:
      'https://i.pinimg.com/736x/aa/72/91/aa72913855f9e02a949a5c392b48299e.jpg',
    name: 'Hang Kia',
    address: 'Pà Cò, Hòa Bình',
  },
  children: [
    {
      key: '0_0',
      type: 'element',
      styleClass:
        '!rounded-full shadow-lg cursor-pointer hover:!bg-[rgba(144,238,144,0.4)] text-white w-38 h-38',
      data: {
        image: '/src/assets/images/circus.svg',
        name: 'Điểm tham quan',
      },
      children: [
        {
          name: 'Săn mây Hang Kia',
          category: {
            name: 'Thiên nhiên',
            image:
              '/src/assets/images/destination/destination-attraction-categories/nature.svg',
          },
          address: 'Hang Kia, Hòa Bình',
          styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
        },
        {
          name: 'Bản Thung Mài',
          category: {
            name: 'Trải nghiệm bản sắc địa phương',
            image:
              '/src/assets/images/destination/destination-attraction-categories/local.svg',
          },
          address: 'Hang Kia, Hòa Bình',
          styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
        },
      ],
    },
    {
      key: '0_1',
      type: 'element',
      styleClass:
        '!rounded-full shadow-lg cursor-pointer hover:!bg-[rgba(255,200,150,0.4)] text-white w-38 h-38',
      data: {
        image: '/src/assets/images/hotel.svg',
        name: 'Nơi trú',
        title: 'CTO',
      },
      children: [
        {
          name: 'Vàng Lềnh Homestay',
          category: {
            name: 'homestay',
            image:
              '/src/assets/images/destination/destination-accommodation-categories/homestay.svg',
          },
          address: 'Hang Kia, Hòa Bình',
          styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
        },
      ],
    },
    {
      key: '0_2',
      type: 'element',
      styleClass:
        '!rounded-full shadow-lg cursor-pointer hover:!bg-[rgba(173,216,230,0.4)] text-white w-38 h-38',
      data: {
        image: '/src/assets/images/restaurant.svg',
        name: 'Điểm ăn uống',
        title: 'CTO',
      },
      children: [
        {
          name: 'Chờ đêm Pà Cò',
          category: {
            name: 'Ẩm thực địa phương',
            image:
              '/src/assets/images/destination/destination-restaurant-categories/local.svg',
          },
          address: 'Hang Kia, Hòa Bình',
          styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
        },
        {
          name: 'Nhà hàng Sơn Nước',
          category: {
            name: 'Nhà hàng bình dân',
            image:
              '/src/assets/images/destination/destination-restaurant-categories/casual_dining.svg',
          },
          address: 'Hang Kia, Hòa Bình',
          styleClass: 'text-white rounded-xl shadow-lg cursor-pointer',
        },
      ],
    },
  ],
})
const visible = ref(false)
</script>
<template>
  <div class="flex justify-center items-center w-full h-[calc(100vh-30px)]">
    <OrganizationChart :value="data as any" collapsible>
      <template #destination="slotProps">
        <div
          class="flex justify-center items-center gap-8 p-4"
          @click="visible = true"
        >
          <img
            :alt="slotProps.node.data.name"
            :src="slotProps.node.data.image"
            class="mb-4 w-28 h-28 rounded-lg"
          />
          <div class="flex flex-col items-center">
            <span class="font-bold mb-2">{{ slotProps.node.data.name }}</span>
            <span class="text-xs text-gray-600">{{
              slotProps.node.data.address
            }}</span>
          </div>
        </div>
      </template>
      <template #element="slotProps">
        <div class="flex flex-col justify-center items-center gap-2 p-2">
          <img
            :alt="slotProps.node.data.name"
            :src="slotProps.node.data.image"
            class="w-12 h-12 rounded-lg"
          />
          <div class="flex flex-col items-center">
            <span class="font-bold mb-2 text-sm">{{
              slotProps.node.data.name
            }}</span>
          </div>
        </div>
      </template>
      <template #default="slotProps">
        <div
          class="div w-60 bg-white m-auto rounded-xl relative group p-2 z-0 overflow-hidden"
        >
          <div
            class="h-[7em] w-[7em] bg-[#9FE2BF] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[550%] z-[-1] duration-[400ms]"
          ></div>
          <div
            class="h-[6em] w-[6em] bg-[#40E0D0] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[400%] z-[-1] duration-[400ms]"
          ></div>
          <div
            class="h-[5em] w-[5em] bg-[#6495ED] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]"
          ></div>
          <div class="flex items-center justify-center flex-col gap-2">
            <h3
              class="z-20 font-bold text-md group-hover:text-white duration-100"
            >
              {{ slotProps.node.name }}
            </h3>
            <h3
              class="z-20 font-bold text-md group-hover:text-white duration-100 flex justify-center items-center gap-2"
            >
              <img
                :src="slotProps.node.category.image"
                alt=""
                class="rounded-full w-6 h-6"
              />
              <span class="text-sm text-amber-600">{{
                slotProps.node.category.name
              }}</span>
            </h3>
            <h3
              class="z-20 font-bold text-md group-hover:text-white duration-100 text-sm text-cyan-400 flex justify-center items-center gap-2"
            >
              <i class="pi pi-map-marker"></i>{{ slotProps.node.address }}
            </h3>
          </div>
        </div>
      </template>
    </OrganizationChart>
    <Drawer
      v-model:visible="visible"
      header="Drawer"
      class="!w-full md:!w-80 lg:!w-1/2"
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Drawer>
  </div>
</template>
<style scoped>
.p-organizationchart {
  max-width: 100%;
}
</style>
