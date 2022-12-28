<template>
  <el-dialog v-model="showDialog" title="编辑记录" width="600px">
    <div class="w-[300px]">
      <MyForm ref="myForm" :data="data"></MyForm>
    </div>
    <template #footer>
      <div>
        <el-button>取消</el-button>
        <el-button type="primary" @click="submitForm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, toRaw } from 'vue';
import MyForm from './form.vue';

const props = defineProps({
  visable: {
    type: Boolean,
    required: true
  },
  data: {
    required: true
  }
});

const Emits = defineEmits(['update:visable', 'editLine']);

const showDialog = computed({
  get: () => {
    return props.visable;
  },
  set: (nv) => {
    Emits('update:visable', nv);
  }
});

const myForm = ref();
const submitForm = () => {
  Emits('editLine', toRaw(myForm.value.form));
};
</script>
<style scoped></style>
