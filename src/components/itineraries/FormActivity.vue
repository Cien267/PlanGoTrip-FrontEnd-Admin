<script setup lang="ts">
import { useCreateOrUpdateItinerary } from '@/composables/useCreateOrUpdateItinerary'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import DatePicker from 'primevue/datepicker'
import Textarea from 'primevue/textarea'
import Fieldset from 'primevue/fieldset'
import Button from 'primevue/button'
import { TIME_SLOTS, DESTINATION_ELEMENTS } from '@/constants/itineraries'

const { day } = defineProps(['day'])
const { getListActivitiesByDay, removeActivity } = useCreateOrUpdateItinerary()
</script>

<template>
  <Fieldset
    :legend="itinerary.name"
    v-for="itinerary in getListActivitiesByDay(day)"
    :key="itinerary.uuid"
    :toggleable="true"
    class="relative"
  >
    <Button
      icon="pi pi-times"
      severity="secondary"
      rounded
      size="small"
      aria-label="Cancel"
      class="!absolute -right-3 -top-8 !scale-60"
      @click="removeActivity(day, itinerary.uuid)"
    />
    <div class="flex flex-col gap-2 my-2">
      <label for="name">Tên hoạt động</label>
      <InputText
        id="name"
        v-model="itinerary.name"
        aria-describedby="name-help"
      />
    </div>
    <div class="flex justify-between items-center gap-2 my-2">
      <div class="flex flex-col gap-2 w-[calc(33%-8px)]">
        <label for="time-slot">Buổi</label>
        <Select
          v-model="itinerary.timeSlot"
          :options="TIME_SLOTS"
          optionLabel="name"
          placeholder="Chọn buổi"
        />
      </div>
      <div class="flex flex-col gap-2 w-[calc(33%-8px)]">
        <label for="datepicker-timeonly-start-time">Thời gian bắt đầu</label>
        <DatePicker
          id="datepicker-timeonly-start-time"
          v-model="itinerary.startTime"
          timeOnly
          fluid
        />
      </div>
      <div class="flex flex-col gap-2 w-[calc(33%-8px)]">
        <label for="datepicker-timeonly-end-time">Thời gian kết thúc</label>
        <DatePicker
          id="datepicker-timeonly-end-time"
          v-model="itinerary.endTime"
          timeOnly
          fluid
        />
      </div>
    </div>
    <div class="flex justify-between items-center gap-2 my-2">
      <div class="flex flex-col gap-2 w-[calc(50%-8px)]">
        <label for="time-slot">Loại tiện ích</label>
        <Select
          v-model="itinerary.activityType"
          :options="DESTINATION_ELEMENTS"
          optionLabel="name"
          placeholder="Chọn loại tiện ích"
        />
      </div>
      <div class="flex flex-col gap-2 w-[calc(50%-8px)]">
        <label for="datepicker-timeonly-start-time">Tiện ích</label>
        <Select
          v-model="itinerary.activityId"
          :options="DESTINATION_ELEMENTS"
          optionLabel="name"
          placeholder="Chọn tiện ích"
        />
      </div>
    </div>
    <div class="flex flex-col gap-2 my-2">
      <label for="location">Địa chỉ</label>
      <InputText
        id="location"
        v-model="itinerary.location"
        aria-describedby="location-help"
      />
    </div>
    <div class="flex flex-col gap-2 my-2">
      <label for="map-link">Map link</label>
      <InputText
        id="map-link"
        v-model="itinerary.mapLink"
        aria-describedby="map-link-help"
      />
    </div>
    <div class="flex flex-col gap-2 my-2">
      <label for="description">Mô tả</label>
      <Textarea v-model="itinerary.description" rows="5" />
    </div>
    <div class="flex flex-col gap-2 my-2">
      <label for="note">Note</label>
      <Textarea v-model="itinerary.note" rows="5" />
    </div>
  </Fieldset>
</template>
