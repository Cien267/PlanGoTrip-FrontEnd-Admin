import './assets/css/main.css'
import './assets/css/tailwindcss.css'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'
import router from './router'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)
app.use(ToastService)
app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.plangotrip-app-dark',
    },
  },
})
app.directive('tooltip', Tooltip)
app.mount('#app')
