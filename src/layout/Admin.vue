<template>
  <div class="flex">
    <Sidebar />
    <router-view class="flex-grow"></router-view>
  </div>
</template>
<script>
import Sidebar from '@/components/dashboard/Sidebar';

export default {
  name: 'Admin',
  components: {
    Sidebar,
  },
};
</script>
