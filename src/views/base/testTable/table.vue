<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="日期" min-width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="姓名" prop="name" min-width="180"> </el-table-column>
    <el-table-column label="手机号" prop="phone" min-width="180"> </el-table-column>
    <el-table-column label="操作" min-width="180">
      <template #default="scope">
        <div class="flex">
          <el-button @click="editLine(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteLine(scope.$index)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

// 配置项
const tableConfig = [];

const Emits = defineEmits(['deleteLine', 'editLine'])
const deleteLine = (index: number) => {
  Emits('deleteLine', index)
}
const editLine = (index: number, line: any) => {
  Emits('editLine', index, line)
}
</script>
