import { createRouter, createWebHistory } from 'vue-router'
import NotFoundPage from '@/views/NotFoundPage.vue'
import { ROUTER_NAME_LIST } from '@/constants/routers'
import { useAuth } from '@/composables/useAuth'
import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'

const { token } = useAuth()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: ROUTER_NAME_LIST.LOGIN_PAGE,
      component: LoginPage,
      meta: { transition: 'slide-fade' },
    },
    {
      path: '/home',
      name: ROUTER_NAME_LIST.HOME_PAGE,
      component: HomePage,
      meta: { requiresAuth: true },
    },
    { path: `/:notFound(.*)`, component: NotFoundPage },
  ],
})

router.beforeEach((to, _, next) => {
  if (to.name === ROUTER_NAME_LIST.LOGIN_PAGE && token.value) {
    return next({ name: ROUTER_NAME_LIST.HOME_PAGE })
  }
  if (to.meta.requiresAuth && !token.value) {
    return next({ name: ROUTER_NAME_LIST.LOGIN_PAGE })
  }
  next()
})

export default router
