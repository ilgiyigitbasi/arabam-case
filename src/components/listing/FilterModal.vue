<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div class="absolute inset-0 bg-black/50" @click="$emit('close')" />

      <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 class="font-bold text-xl text-gray-900">Filtrele</h2>
          <button @click="$emit('close')" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            ✕
          </button>
        </div>

        <div class="p-6 space-y-5">

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Yıl Aralığı</label>
            <div class="grid grid-cols-2 gap-3">
              <input
                v-model.number="localFilters.minYear"
                type="number"
                placeholder="Min yıl"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              <input
                v-model.number="localFilters.maxYear"
                type="number"
                placeholder="Max yıl"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fiyat Aralığı (₺)</label>
            <div class="grid grid-cols-2 gap-3">
              <input
                v-model.number="localFilters.minPrice"
                type="number"
                placeholder="Min fiyat"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              <input
                v-model.number="localFilters.maxPrice"
                type="number"
                placeholder="Max fiyat"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tarih Aralığı</label>
            <div class="grid grid-cols-2 gap-3">
              <input
                v-model="localFilters.minDate"
                type="date"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
              <input
                v-model="localFilters.maxDate"
                type="date"
                class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-3 p-6 border-t border-gray-100">
          <button
            @click="handleReset"
            class="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Temizle
          </button>
          <button
            @click="handleApply"
            class="flex-1 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >
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