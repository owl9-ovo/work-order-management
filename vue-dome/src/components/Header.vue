<template>
  <header class="header">
    <div class="logo">工单管理系统</div>
    <div class="user-info">
      <span>欢迎, {{ user.username }}</span>
      <el-tag :type="user.isAdmin ? 'success' : 'primary'">
        {{ user.isAdmin ? '管理员' : '普通用户' }}
      </el-tag>
      <el-button type="text" @click="handleLogout">退出登录</el-button>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user

const handleLogout = () => {
  authStore.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #165DFF;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-info span {
  white-space: nowrap;
}
</style>
    