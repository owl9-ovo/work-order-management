import { defineStore } from 'pinia'

// 初始化工单数据（用户提供的数据）
const initialTickets = [
  { id: '001', project: 'Road Project A', overtime: true, hours: 3.5, created_at: '2024-04-10 10:30' },
  { id: '002', project: 'Bridge Maintenance B', overtime: false, hours: 2, created_at: '2024-04-09 13:00' },
  { id: '003', project: 'Pipeline Fix C', overtime: true, hours: 4.5, created_at: '2024-04-08 08:00' },
  { id: '004', project: 'Bridge Maintenance B', overtime: true, hours: 3, created_at: '2024-04-07 16:45' },
  { id: '005', project: 'Tunnel Cleaning D', overtime: false, hours: 8.1, created_at: '2024-04-03 11:43' }
]

export const useTicketsStore = defineStore('tickets', {
  state: () => ({
    tickets: initialTickets
  }),
  actions: {
    // 删除工单
    deleteTicket(id) {
      this.tickets = this.tickets.filter(ticket => ticket.id !== id)
    },
    // 添加工单
    addTicket(ticket) {
      this.tickets.push(ticket)
    },
    // 更新工单
    updateTicket(updatedTicket) {
      const index = this.tickets.findIndex(t => t.id === updatedTicket.id)
      if (index !== -1) {
        this.tickets[index] = updatedTicket
      }
    }
  },
  getters: {
    // 按项目统计工时（用于图表）
    projectHours() {
      const hours = {}
      this.tickets.forEach(ticket => {
        if (hours[ticket.project]) {
          hours[ticket.project] += ticket.hours
        } else {
          hours[ticket.project] = ticket.hours
        }
      })
      return hours
    }
  }
})