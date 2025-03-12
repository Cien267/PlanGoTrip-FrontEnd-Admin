<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import { Form } from '@primevue/forms'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ThemeSwitch from '@/components/common/ThemeSwitch.vue'
import EntireScreenLoader from '@/components/common/EntireScreenLoader.vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import { ROUTER_NAME_LIST } from '@/constants/routers'
import { useTheme } from '@/composables/useTheme'
const { toggleTheme } = useTheme()

onMounted(() => {
  toggleTheme()
})
const toast = useToast()
const router = useRouter()

const initialValues = ref({
  email: '',
  password: '',
})

const resolver = zodResolver(
  z.object({
    email: z
      .string()
      .min(1, { message: 'Thiếu thông tin email.' })
      .email('Email không hợp lệ.'),
    password: z.string().min(3, { message: 'Ít nhất 3 ký tự.' }),
  }),
)

const { error, loading, login } = useAuth()
const onFormSubmit = async () => {
  try {
    await login(initialValues.value)
    if (error.value) {
      toast.add({
        severity: 'error',
        summary: 'Thông tin đăng nhập không hợp lệ',
        life: 3000,
      })
      return
    }
    router.push({ name: ROUTER_NAME_LIST.HOME_PAGE })
  } catch (e: any) {
    console.error(e)
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-start pt-14">
    <entire-screen-loader v-if="loading"></entire-screen-loader>
    <theme-switch class="fixed top-6 right-6"></theme-switch>
    <img src="/src/assets/images/logo.png" alt="logo" class="plangotrip-logo" />
    <div class="card flex justify-center">
      <Toast position="bottom-right" />
      <Card class="">
        <template #title>Đăng nhập</template>
        <template #content>
          <Form
            v-slot="$form"
            :initialValues
            :resolver
            @submit="onFormSubmit"
            class="flex flex-col gap-10 w-full sm:w-96 mt-10"
          >
            <div class="flex flex-col gap-1">
              <InputText
                name="email"
                type="text"
                placeholder="Email"
                fluid
                v-model="initialValues.email"
              />
              <Message
                v-if="$form.email?.invalid"
                severity="error"
                size="small"
                variant="simple"
                >{{ $form.email.error.message }}</Message
              >
            </div>
            <div class="flex flex-col gap-1">
              <Password
                name="password"
                placeholder="Mật khẩu"
                :feedback="false"
                toggleMask
                fluid
                v-model="initialValues.password"
              />
              <Message
                v-if="$form.password?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                <ul class="my-0 px-4 flex flex-col gap-1">
                  <li
                    v-for="(error, index) of $form.password.errors"
                    :key="index"
                  >
                    {{ error.message }}
                  </li>
                </ul>
              </Message>
            </div>
            <Button
              type="submit"
              severity="secondary"
              label="Đăng nhập"
              raised
            />
          </Form>
        </template>
      </Card>
    </div>
  </div>
</template>
