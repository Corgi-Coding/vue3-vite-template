<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="日期" prop="date">
      <el-input v-model="form.date"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, watch, onMounted } from 'vue';

const props = defineProps(['data']);

// do not use same name with ref
const form = reactive({
  name: '',
  date: '',
  phone: ''
});
watch(
  () => props.data,
  (nv) => {
    getEditData(nv);
  },
  {
    deep: true
  }
);

const getEditData = (nv: any) => {
  form.date = nv.date;
  form.name = nv.name;
  form.phone = nv.phone;
};

onMounted(() => {
  console.log(props.data);

  if (props.data) {
    getEditData(props.data);
  }
});

defineExpose({
  form
});
</script>
