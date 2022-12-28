<script setup lang="ts">
import { ref } from 'vue';
import AddDialog from './dialog.vue';
import EditDialog from './editDialog.vue';
import MyTable from './table.vue';

const showAdd = ref(false);
const showAddDialog = () => {
  showAdd.value = true;
};

// 新增
const addNewData = (newLine: any) => {
  // 插入到表格组件的操作
  tableData.value.push(newLine);

  showAdd.value = false;
};
// 删除
const deleteLine = (deleteIndex: number) => {
  tableData.value.splice(deleteIndex, 1);
}
// 编辑
const nowRow = ref({});
const nowIndex = ref(-1);
const showEdit = ref(false);

const editLine = (index: number, row: any) => {
  nowRow.value = row;
  nowIndex.value = index;

  // console.log(row, index);
  

  showEdit.value = true;
}

const editDone = (row: any) => {
  tableData.value.splice(nowIndex.value, 1, row);

  showEdit.value = false;
}

const tableData = ref([
  {
    name: 'tang',
    date: new Date().toLocaleString(),
    phone: '110'
  }
]);

</script>

<template>
  <div class="p-5 relative">
    <header>
      <div class="mr-2 float-right">
        <el-button type="primary" @click="showAddDialog">新增记录</el-button>
      </div>
    </header>
    <section>
      <MyTable :data="tableData" @deleteLine="deleteLine" @editLine="editLine"></MyTable>
    </section>
    <footer></footer>
    <AddDialog v-model:visable="showAdd" @addNew="addNewData"></AddDialog>
    <EditDialog v-if="showEdit" v-model:visable="showEdit" :data="nowRow" @editLine="editDone"></EditDialog>
  </div>
</template>
