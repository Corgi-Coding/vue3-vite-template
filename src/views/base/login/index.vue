<script setup lang="ts">
import uniButton from '@/components/uniButton/index.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginMethod = () => {
  localStorage.setItem('token', 'tangdenglu');
  router.push('/about');
};
</script>

<template>
  <div>LOgin</div>
  <div>
    <uniButton @click="loginMethod">click</uniButton>
  </div>
</template>
