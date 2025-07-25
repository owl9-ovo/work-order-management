<template>
  <div class="chart-container">
    <h3>项目工时分布</h3>
    <div ref="chartRef" class="chart" :style="{ width: '100%', height: '400px' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'
import { useTicketsStore } from '../store/tickets'

const chartRef = ref(null)
const ticketsStore = useTicketsStore()
let chartInstance = null

// 初始化图表
const initChart = () => {
  if (chartInstance) {
    chartInstance.dispose()
  }
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = getChartOption()
  chartInstance.setOption(option)
}

// 获取图表配置
const getChartOption = () => {
  const projectHours = ticketsStore.projectHours
  const projects = Object.keys(projectHours)
  const hours = Object.values(projectHours)
  
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: projects
    },
    yAxis: {
      type: 'value',
      name: '工时(小时)'
    },
    series: [
      {
        name: '工时',
        type: 'bar',
        data: hours,
        label: {
          show: true,
          position: 'top'
        }
      }
    ]
  }
}

// 监听数据变化，更新图表
watch(
  () => ticketsStore.tickets,
  () => {
    if (chartInstance) {
      chartInstance.setOption(getChartOption())
    }
  },
  { deep: true }
)

// 页面加载时初始化图表
onMounted(() => {
  initChart()
  
  // 监听窗口大小变化，调整图表尺寸
  window.addEventListener('resize', () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  })
})
</script>

<style scoped>
.chart-container {
  padding: 20px;
  border-left: 1px solid #eee;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}
</style>
    