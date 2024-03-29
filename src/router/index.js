import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Cart from '@/components/Cart'
import Login from '@/components/Login'
import Name from '@/components/name'
import Profile from '@/components/Profile'
import Checkout from '@/components/Checkout'
import order_progress from '@/components/order_progress'
import OrderHistory from '@/components/History'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/name',
      name: 'Name',
      component: Name
    },
    {
      path: '/order_progress/:id',
      name: 'Order Progress',
      component: order_progress
    },
    {
      path: '/history',
      name: 'OrderHistory',
      component: OrderHistory
    }
  ]
})
