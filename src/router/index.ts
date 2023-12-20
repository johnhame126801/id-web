import { createRouter, createWebHistory } from 'vue-router'
import ManagerView from '../views/ManagerView.vue';
import OrderView from '../views/OrderView.vue';
import TakeStockView from '../views/TakeStockView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/manage',
      name: 'Manager',
      component: ManagerView
    },
    {
      path: '/order',
      name: 'Order',
      component: OrderView
    },
    {
      path: '/stock',
      name: 'TakeStock',
      component: TakeStockView
    }
  ]
})

export default router
