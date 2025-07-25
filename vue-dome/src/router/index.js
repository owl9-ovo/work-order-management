import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Main', component: Main }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：未登录则跳转到登录页
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.path !== '/login' && !authStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router