<template>
  <div class="min-h-screen bg-surface-alt text-text">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/shared/Navbar.vue'
</script>