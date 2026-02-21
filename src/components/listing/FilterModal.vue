<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="$emit('close')" />

      <div
        class="relative bg-[#1a1c1e] border border-white/8 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        <div class="flex items-center justify-between p-6 border-b border-white/5">
          <h2 class="font-black text-xl text-white">Filtrele</h2>
          <button @click="$emit('close')"
            class="w-8 h-8 flex items-center cursor-pointer justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
            ✕
          </button>
        </div>


        <div class="p-6 space-y-5">
          <div>
            <label class="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Yıl Aralığı</label>
            <div class="grid grid-cols-2 gap-3">
              <input v-model.number="localFilters.minYear" type="number" placeholder="Min yıl"
                class="w-full px-3 py-2.5 text-sm bg-white/3 border border-white/8 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" />
              <input v-model.number="localFilters.maxYear" type="number" placeholder="Max yıl"
                class="w-full px-3 py-2.5 text-sm bg-white/3 border border-white/8 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Fiyat Aralığı
              (₺)</label>
            <div class="grid grid-cols-2 gap-3">
              <input v-model.number="localFilters.minPrice" type="number" placeholder="Min fiyat"
                class="w-full px-3 py-2.5 text-sm bg-white/3 border border-white/8 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" />
              <input v-model.number="localFilters.maxPrice" type="number" placeholder="Max fiyat"
                class="w-full px-3 py-2.5 text-sm bg-white/3 border border-white/8 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>

          <div>
            <label class="block text-[11px] font-black text-gray-500 uppercase tracking-widest mb-2">Tarih
              Aralığı</label>
            <div class="grid grid-cols-2 gap-3">
              <input v-model="localFilters.minDate" type="date"
                class="w-full px-3 py-2.5 text-sm bg-white/3 border border-white/8 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
              <input v-model="localFilters.maxDate" type="date"
                class="w-full px-3 py-2.5 text-sm bg-white/3 border border-white/8 rounded-xl text-white focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>
        </div>

        <div class="flex gap-3 p-6 border-t border-white/5">
          <button @click="handleReset"
            class="flex-1 px-4 py-3 rounded-xl cursor-pointer border border-white/10 text-sm font-bold text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            Temizle
          </button>
          <button @click="handleApply"
            class="flex-1 px-4 py-3 rounded-xl cursor-pointer bg-primary text-white text-sm font-black hover:bg-primary-dark transition-all">
            Uygula
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { ListingParams } from '@/types'

const props = defineProps<{
  isOpen: boolean
  currentFilters: Partial<ListingParams>
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'apply', filters: Partial<ListingParams>): void
  (e: 'reset'): void
}>()

const localFilters = reactive<Partial<ListingParams>>({
  minYear: undefined,
  maxYear: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  minDate: undefined,
  maxDate: undefined,
})

watch(() => props.isOpen, (open) => {
  if (open) Object.assign(localFilters, props.currentFilters)
})

function handleApply() {
  const clean = Object.fromEntries(
    Object.entries(localFilters).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ) as Partial<ListingParams>
  emit('apply', clean)
  emit('close')
}

function handleReset() {
  Object.keys(localFilters).forEach((key) => {
    (localFilters as Record<string, unknown>)[key] = undefined
  })
  emit('reset')
  emit('close')
}
</script>