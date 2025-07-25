import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // 存储用户信息：{ username, isAdmin }
    isLoggedIn: false
  }),
  actions: {
    // 登录
    login(username) {
      this.user = {
        username,
        isAdmin: username === 'admin' // 管理员判断
      }
      this.isLoggedIn = true
    },
    // 退出登录
    logout() {
      this.user = null
      this.isLoggedIn = false
    }
  }
})