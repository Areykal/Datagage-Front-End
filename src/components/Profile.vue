<script setup>
import { ref } from 'vue';

const userName = ref('John Doe');
</script>

<template>
  <div class="profile-icon">
    <img src="@/assets/logo.png" alt="Profile Picture" />
    <span>{{ userName }}</span>
  </div>
</template>

<style scoped>
.profile-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
}

.profile-icon img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
