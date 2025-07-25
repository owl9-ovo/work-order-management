<template>
  <div class="ticket-table">
    <el-button 
      type="primary" 
      @click="handleAdd" 
      v-if="user.isAdmin"
      style="margin-bottom: 10px;"
    >
      添加工单
    </el-button>
    
    <el-table 
      :data="tickets" 
      border 
      style="width: 100%;"
    >
      <el-table-column 
        prop="id" 
        label="ID" 
        width="80"
      ></el-table-column>
      <el-table-column 
        prop="project" 
        label="Project" 
        width="200"
      ></el-table-column>
      <el-table-column 
        prop="overtime" 
        label="Overtime"
        width="100"
      >
        <template #default="scope">
          <el-tag :type="scope.row.overtime ? 'danger' : 'info'">
            {{ scope.row.overtime ? 'Yes' : 'No' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column 
        prop="hours" 
        label="Hours" 
        width="100"
      ></el-table-column>
      <el-table-column 
        prop="created_at" 
        label="Created At" 
        width="160"
      ></el-table-column>
      <el-table-column 
        label="Actions" 
        width="180"
      >
        <template #default="scope">
          <el-button 
            size="small" 
            type="primary" 
            @click="handleEdit(scope.row)"
            v-if="user.isAdmin"
          >
            编辑
          </el-button>
          <el-button 
            size="small" 
            type="danger" 
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑对话框 -->
    <el-dialog 
      title="编辑工单" 
      v-model="dialogVisible" 
      width="30%"
    >
      <el-form :model="form" :rules="rules" ref="editForm">
        <el-form-item label="Project" prop="project">
          <el-input v-model="form.project"></el-input>
        </el-form-item>
        <el-form-item label="Overtime">
          <el-switch v-model="form.overtime"></el-switch>
        </el-form-item>
        <el-form-item label="Hours" prop="hours">
          <el-input v-model="form.hours" type="number"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue'
import { useTicketsStore } from '../store/tickets'
import { useAuthStore } from '../store/auth'
import { ElMessage } from 'element-plus'

const ticketsStore = useTicketsStore()
const authStore = useAuthStore()
const { tickets } = toRefs(ticketsStore)
const user = authStore.user

// 对话框状态
const dialogVisible = ref(false)
const form = ref({
  id: '',
  project: '',
  overtime: false,
  hours: 0,
  created_at: ''
})

// 表单验证规则
const rules = ref({
  project: [
    { required: true, message: '请输入项目名称', trigger: 'blur' }
  ],
  hours: [
    { required: true, message: '请输入工时', trigger: 'blur' },
    { type: 'number', message: '工时必须为数字', trigger: 'blur' }
  ]
})

// 编辑工单
const handleEdit = (row) => {
  form.value = { ...row }
  dialogVisible.value = true
}

// 删除工单
const handleDelete = (id) => {
  ElMessage.confirm('确定要删除这条工单吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ticketsStore.deleteTicket(id)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 取消删除
  })
}

// 添加工单
const handleAdd = () => {
  form.value = {
    id: '',
    project: '',
    overtime: false,
    hours: 0,
    created_at: new Date().toLocaleString()
  }
  dialogVisible.value = true
}

// 保存工单
const handleSave = () => {
  if (form.value.id) {
    // 更新现有工单
    ticketsStore.updateTicket(form.value)
    ElMessage.success('更新成功')
  } else {
    // 添加新工单
    ticketsStore.addTicket(form.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
}
</script>

<style scoped>
.ticket-table {
  padding: 20px;
}
</style>
    