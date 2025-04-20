import { createRouter, createWebHistory } from 'vue-router'
import NotFoundPage from '@/views/NotFoundPage.vue'
import { ROUTER_NAME_LIST } from '@/constants/routers'
import { useAuth } from '@/composables/useAuth'
import LoginPage from '@/views/LoginPage.vue'
import HomePage from '@/views/HomePage.vue'
import UserPage from '@/views/UserPage.vue'
import VehiclePage from '@/views/VehiclePage.vue'
import DestinationPage from '@/views/destinations/DestinationPage.vue'
import DetailDestinationPage from '@/views/destinations/DetailDestinationPage.vue'
import EditDestinationPage from '@/views/destinations/EditDestinationPage.vue'
import CreateDestinationPage from '@/views/destinations/CreateDestinationPage.vue'
import AttractionCategoriesPage from '@/views/destinations/AttractionCategoriesPage.vue'
import AccommodationCategoriesPage from '@/views/destinations/AccommodationCategoriesPage.vue'
import RestaurantCategoriesPage from '@/views/destinations/RestaurantCategoriesPage.vue'
import ItinerariesPage from '@/views/itineraries/ItinerariesPage.vue'

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
    {
      path: '/destinations',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          name: ROUTER_NAME_LIST.LIST_DESTINATION_PAGE,
          component: DestinationPage,
        },
        {
          path: 'create',
          name: ROUTER_NAME_LIST.CREATE_DESTINATION_PAGE,
          component: CreateDestinationPage,
        },
        {
          path: 'attraction-categories',
          name: ROUTER_NAME_LIST.ATTRACTION_CATEGORIES_PAGE,
          component: AttractionCategoriesPage,
        },
        {
          path: 'accommodation-categories',
          name: ROUTER_NAME_LIST.ACCOMMODATION_CATEGORIES_PAGE,
          component: AccommodationCategoriesPage,
        },
        {
          path: 'restaurant-categories',
          name: ROUTER_NAME_LIST.RESTAURANT_CATEGORIES_PAGE,
          component: RestaurantCategoriesPage,
        },
      ],
    },
    {
      path: '/destination/:id',
      name: ROUTER_NAME_LIST.DETAIL_DESTINATION_PAGE,
      component: DetailDestinationPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/destination/edit/:id',
      name: ROUTER_NAME_LIST.EDIT_DESTINATION_PAGE,
      component: EditDestinationPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/itineraries',
      name: ROUTER_NAME_LIST.LIST_ITINERARY_PAGE,
      component: ItinerariesPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/vehicles',
      name: ROUTER_NAME_LIST.VEHICLE_PAGE,
      component: VehiclePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/users',
      name: ROUTER_NAME_LIST.USER_PAGE,
      component: UserPage,
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
