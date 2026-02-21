<template>
  <RouterLink :to="{ name: 'detail', params: { id: item.id } }" class="ad-card block bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer">
    <div class="relative aspect-[4/3] bg-gray-100 overflow-hidden">
      <img
        :src="photoUrl"
        :alt="item.title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <div class="p-4">
      <h3 class="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-2">
        {{ item.title }}
      </h3>
      <p class="text-brand font-bold text-lg">{{ item.priceFormatted }}</p>
      <div class="flex items-center justify-between text-xs text-gray-500 mt-2">
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