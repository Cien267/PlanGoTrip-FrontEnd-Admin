<script setup lang="ts">
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useCreateOrUpdateItinerary } from '@/composables/useCreateOrUpdateItinerary'
import FormActivity from './FormActivity.vue'

const toast = useToast()

// ========== DAY TABS ==========
type DayType = {
  name: string
  value: number
}
const listDays = ref<DayType[]>([
  {
    name: 'Ngày 1',
    value: 1,
  },
])
const selectedDay = ref(listDays.value[0])
const renderClassBackNextDayBtn = (day: DayType) => {
  if (day.value === 1) return 'justify-end'
  if (day.value === listDays.value.length) return 'justify-start'
  return 'justify-between'
}
const handleAddDay = () => {
  const lastValue =
    listDays.value.length > 0
      ? listDays.value[listDays.value.length - 1].value
      : 0
  listDays.value.push({
    name: `Ngày ${lastValue + 1}`,
    value: lastValue + 1,
  })
}
const handleDeleteDay = (dayToRemove: DayType) => {
  if (dayToRemove.value === 1) {
    toast.add({
      severity: 'info',
      summary: 'Lưu ý',
      detail: 'Ít nhất phải có 1 ngày trong lịch trình',
      life: 3000,
    })
    return
  }
  listDays.value = listDays.value.filter(day => day.value !== dayToRemove.value)
  listDays.value = listDays.value
    .sort((a, b) => a.value - b.value)
    .map((_day, index) => ({
      name: `Ngày ${index + 1}`,
      value: index + 1,
    }))
}
// ========== END DAY TABS ==========

// ========== ACTIVITIES ==========
const { getListActivitiesByDay, addActivity } = useCreateOrUpdateItinerary()
// ========== END ACTIVITIES ==========
</script>

<template>
  <div class="w-full flex justify-end">
    <Button
      icon="pi pi-plus"
      severity="primary"
      size="small"
      label="Thêm ngày"
      @click="handleAddDay"
    ></Button>
  </div>
  <div class="card flex justify-center w-full">
    <Stepper :value="selectedDay.value" class="w-full">
      <StepList>
        <Step v-for="day in listDays" :key="day.value" :value="day.value">{{
          day.name
        }}</Step>
      </StepList>
      <StepPanels>
        <StepPanel
          v-for="day in listDays"
          :key="day.value"
          v-slot="{ activateCallback }"
          :value="day.value"
        >
          <div
            class="flex flex-col border border-dashed border-slate-400 rounded-lg p-4 relative"
          >
            <Button
              icon="pi pi-times"
              severity="danger"
              rounded
              size="small"
              aria-label="Cancel"
              class="!absolute -right-3 -top-3 !scale-60"
              @click="handleDeleteDay(day)"
            />
            <div v-if="getListActivitiesByDay(day.value).length">
              <FormActivity :day="day.value"></FormActivity>
            </div>
            <div v-else class="text-slate-400">Chưa có hoạt động nào</div>
            <Button
              icon="pi pi-plus"
              label="Thêm hoạt động"
              severity="primary"
              size="small"
              variant="outlined"
              class="my-4"
              @click="addActivity(day.value)"
            />
          </div>
          <div :class="[renderClassBackNextDayBtn(day), 'flex pt-6']">
            <Button
              v-if="day.value > 1"
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback(day.value - 1)"
            />
            <Button
              v-if="day.value < listDays.length"
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback(day.value + 1)"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>
