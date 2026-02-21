<template>
  <RouterLink :to="{ name: 'detail', params: { id: item.id } }"
    class="ad-card block bg-surface-dark rounded-xl overflow-hidden transition-all duration-300 cursor-pointer">
    <div class="relative aspect-[4/3] bg-surface-dark overflow-hidden">
      <img :src="photoUrl" :alt="item.title" class="w-full h-full object-cover" loading="lazy" />
    </div>

    <div class="p-3 bg-surface-dark">
      <h3 class="text-white font-medium text-sm leading-tight line-clamp-2 mb-1.5">
        {{ item.title }}
      </h3>
      <p class="text-primary font-semibold text-sm">{{ item.priceFormatted }}</p>
      <div class="flex items-center justify-between text-xs text-gray-400 mt-1.5">
        <span>{{ item.location.cityName }}</span>
        <span>{{ item.dateFormatted }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ListItem } from '@/types'
import { getPhotoUrl } from '@/services/api'

const props = defineProps<{
  item: ListItem
}>()

const photoUrl = computed(() => {
  return getPhotoUrl(props.item.photo, '800x600')
})
</script>