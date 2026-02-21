<template>
  <RouterLink :to="{ name: 'detail', params: { id: item.id } }"
    class="group block bg-surface-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 shadow-lg hover:shadow-2xl">

    <div class="relative aspect-[4/3.8] overflow-hidden bg-surface-alt">
      <img :src="photoUrl" :alt="item.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-70"></div>

      <div class="absolute bottom-4 left-5">
        <span class="text-white font-black text-xl tracking-tighter">
          {{ item.priceFormatted }}
        </span>
      </div>
    </div>

    <div class="p-6">
      <h3
        class="text-text-white font-bold text-sm md:text-base leading-snug line-clamp-4 h-[5.5rem] mb-4 group-hover:text-primary transition-colors">
        {{ item.title }}
      </h3>

      <div class="flex items-center justify-between pt-4 border-t border-white/5">
        <div class="flex flex-col gap-0.5">
          <span class="text-[10px] font-black text-text-muted uppercase tracking-widest">Konum</span>
          <span class="text-xs font-bold text-text-gray tracking-tight">
            {{ item.location.cityName }}
          </span>
        </div>
        <div class="flex flex-col items-end gap-0.5">
          <span class="text-[10px] font-black text-text-muted uppercase tracking-widest">Yayın Tarihi</span>
          <span class="text-xs font-medium text-text-muted italic">
            {{ item.dateFormatted }}
          </span>
        </div>
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