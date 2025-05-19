import { ref, watch } from 'vue'
import type { ActivityType } from '@/types'
import { v4 as uuidv4 } from 'uuid'

const listActivities = ref<ActivityType[]>([])
watch(listActivities.value, () => {
  console.log('updated', listActivities.value)
})
export const useCreateOrUpdateItinerary = () => {
  const getListActivitiesByDay = (dayNumber: number) => {
    return listActivities.value.filter(
      activity => activity.dayNumber === dayNumber,
    )
  }

  const addActivity = (dayNumber: number = 1) => {
    listActivities.value.push({
      uuid: uuidv4(),
      version: 1,
      name: '',
      dayNumber: dayNumber,
      position: undefined,
      timeSlot: {
        name: '',
        code: '',
      },
      startTime: '',
      endTime: '',
      location: '',
      mapLink: '',
      description: '',
      note: '',
      activityId: null,
      activityType: '',
    })
  }
  const removeActivity = (day: number, uuid: string) => {
    const index = listActivities.value.findIndex(
      item => item.dayNumber === day && item.uuid === uuid,
    )
    if (index !== -1) {
      listActivities.value.splice(index, 1)
    }
  }

  return {
    getListActivitiesByDay,
    listActivities,
    addActivity,
    removeActivity,
  }
}
