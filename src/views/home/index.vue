<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <div class="text-xl text-red-500">Hello, world</div>
  </div>
</template>

<script lang="ts" setup>
import service from '@/config/http.config';

service.get('/api/test').then((res) => {
  if (res) {
    console.log(res);
  }
});
</script>
