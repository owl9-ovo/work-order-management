<template>
  <!-- 登录页面的HTML结构 -->
  <div class="login-container">
    <div class="login-box">
      <h2>登录系统</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-item">
          <label>用户名：</label>
          <input 
            type="text" 
            v-model="username" 
            placeholder="请输入用户名"
            required
          >
        </div>
        <div class="form-item">
          <label>密码：</label>
          <input 
            type="password" 
            v-model="password" 
            placeholder="请输入密码"
            required
          >
        </div>
        <button type="submit" class="login-btn">登录</button>
      </form>
    </div>
  </div>
</template>

<script setup>
// 登录逻辑代码
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { ElMessage } from 'element-plus'

// 定义用户名和密码变量
const username = ref('')
const password = ref('')

// 路由和状态管理
const router = useRouter()
const authStore = useAuthStore()

// 登录处理函数
const handleLogin = () => {
  // 简单验证：用户名和密码不能为空
  if (!username.value || !password.value) {
    ElMessage.error('请输入用户名和密码')
    return
  }

  // 调用登录方法（Pinia中的登录逻辑）
  authStore.login(username.value)
  
  // 显示登录成功提示
  ElMessage.success('登录成功！')
  
  // 跳转到主页面
  router.push('/')
}
</script>

<style scoped>
/* 登录页面样式 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  width: 350px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-item input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-btn:hover {
  background-color: #66b1ff;
}
</style>
    