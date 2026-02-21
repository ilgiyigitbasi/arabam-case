<template>
  <div class="relative overflow-hidden rounded-[2.5rem] bg-surface-dark aspect-square group shadow-2xl">

    <div class="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <img v-for="(photo, index) in photos" :key="index" :src="getPhotoUrl(photo, '800x600')"
        :alt="`Fotoğraf ${index + 1}`"
        class="w-full h-full object-cover flex-shrink-0 cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
        @click="openFullscreen(index)" />
    </div>

    <button v-if="currentIndex > 0" @click="prev"
      class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-primary backdrop-blur-md text-white rounded-2xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0">
      <span class="text-2xl mt-[-2px]">‹</span>
    </button>

    <button v-if="currentIndex < photos.length - 1" @click="next"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-primary backdrop-blur-md text-white rounded-2xl flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0">
      <span class="text-2xl mt-[-2px]">›</span>
    </button>

    <div
      class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/20 backdrop-blur-lg rounded-full">
      <button v-for="(_, index) in photos" :key="index" @click="currentIndex = index" :class="[
        'h-1.5 rounded-full transition-all duration-300',
        currentIndex === index ? 'w-6 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/60'
      ]" />
    </div>

    <div
      class="absolute top-5 right-5 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/10 uppercase tracking-widest">
      {{ currentIndex + 1 }} / {{ photos.length }}
    </div>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="fullscreenIndex !== null"
        class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
        @click.self="fullscreenIndex = null">
        <img :src="getPhotoUrl(photos[fullscreenIndex] ?? '', '800x600')"
          class="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />

        <button @click="fullscreenIndex = null"
          class="absolute top-6 right-6 text-white bg-white/10 hover:bg-primary w-12 h-12 flex items-center justify-center rounded-2xl transition-all border border-white/10">
          <span class="text-xl">✕</span>
        </button>

        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
          <button @click="prev" v-if="currentIndex > 0"
            class="px-6 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl font-bold transition-all">Geri</button>
          <button @click="next" v-if="currentIndex < photos.length - 1"
            class="px-6 py-2 bg-white/10 hover:bg-white text-white hover:text-black rounded-xl font-bold transition-all">İleri</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

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