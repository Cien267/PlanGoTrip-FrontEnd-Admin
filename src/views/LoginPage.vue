<script lang="ts" setup>
import { ref } from 'vue'
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

const toast = useToast()

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
    password: z
      .string()
      .min(3, { message: 'Ít nhất 3 ký tự.' })
      .refine(value => /[a-z]/.test(value), {
        message: 'Phải có ít nhất 1 ký tự viết thường.',
      })
      .refine(value => /[A-Z]/.test(value), {
        message: 'Phải có ít nhất 1 ký tự viết hoa.',
      })
      .refine(value => /d/.test(value), {
        message: 'Phải có ít nhất 1 số.',
      }),
  }),
)

const onFormSubmit = (e: any) => {
  if (e.valid) {
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="card flex justify-center">
      <Toast />
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
              <InputText name="email" type="text" placeholder="Email" fluid />
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
