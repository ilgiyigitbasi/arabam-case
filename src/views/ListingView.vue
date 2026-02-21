<template>
  <div>
    <h1>İlanlar</h1>

    <div v-if="store.isLoadingList">Yükleniyor...</div>
    <div v-else-if="store.listError">{{ store.listError }}</div>
    <div v-else>
      <div v-for="ad in store.list" :key="ad.id">
        {{ ad.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/stores/store'

const store = useStore()

onMounted(() => {
  store.fetchListings()
})
</script>