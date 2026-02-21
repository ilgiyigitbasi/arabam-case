import { createRouter, createWebHistory } from 'vue-router'
import ListingView from '@/views/ListingView.vue'
import DetailView from '@/views/detail/DetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'listing',
      component: ListingView,
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailView,
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router