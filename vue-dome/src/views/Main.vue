<template>
  <div class="main-container">
    <Header />
    <div class="content">
      <TicketTable />
      <ChartView />
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import TicketTable from '../components/TicketTable.vue'
import ChartView from '../components/ChartView.vue'
import { useAuthStore } from '../store/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 检查登录状态
onMounted(() => {
  const authStore = useAuthStore()
  const router = useRouter()
  
  authStore.initAuth()
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
</style>
    