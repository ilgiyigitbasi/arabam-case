<template>
  <div class="relative overflow-hidden rounded-xl mb-6">

    <div
      class="flex transition-transform duration-400 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <img
        v-for="(photo, index) in photos"
        :key="index"
        :src="getPhotoUrl(photo, '800x600')"
        :alt="`Fotoğraf ${index + 1}`"
        class="w-full h-96 object-cover flex-shrink-0 cursor-pointer"
        @click="openFullscreen(index)"
      />
    </div>

    <button
      v-if="currentIndex > 0"
      @click="prev"
      class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
    >
      ‹
    </button>
    <button
      v-if="currentIndex < photos.length - 1"
      @click="next"
      class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
    >
      ›
    </button>

    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
      <button
        v-for="(_, index) in photos"
        :key="index"
        @click="currentIndex = index"
        :class="[
          'w-2 h-2 rounded-full transition-all',
          currentIndex === index ? 'bg-white' : 'bg-white/50'
        ]"
      />
    </div>

    <!-- Counter -->
    <div class="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
      {{ currentIndex + 1 }} / {{ photos.length }}
    </div>
  </div>

  <!-- Fullscreen -->
  <Teleport to="body">
    <div
      v-if="fullscreenIndex !== null"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      @click.self="fullscreenIndex = null"
    >
      <img
        :src="getPhotoUrl(photos[fullscreenIndex] ?? '', '800x600')"
        class="max-w-full max-h-full object-contain"
      />
      <button
        @click="fullscreenIndex = null"
        class="absolute top-4 right-4 text-white text-2xl w-10 h-10 flex items-center justify-center bg-black/50 rounded-full"
      >
        ✕
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getPhotoUrl } from '@/services/api'

defineProps<{
  photos: string[]
}>()

const currentIndex = ref(0)
const fullscreenIndex = ref<number | null>(null)

function prev() {
  currentIndex.value--
}

function next() {
  currentIndex.value++
}

function openFullscreen(index: number) {
  fullscreenIndex.value = index
}
</script>