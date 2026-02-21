<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="font-bold text-3xl text-gray-900">İlanlar</h1>

      <button
        @click="showFilter = true"
        class="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-400 transition-colors bg-white"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M7 8h10M11 12h4" />
        </svg>
        Filtrele
      </button>
    </div>

    <!-- Toolbar -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Sırala:</span>
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          @click="handleSort(opt.value)"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
            store.params.sort === opt.value
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          ]"
        >
          {{ opt.label }}
        </button>

        <button
          @click="toggleDirection"
          class="px-3 py-1.5 rounded-lg text-xs font-medium border bg-white text-gray-600 border-gray-200 hover:border-gray-400 transition-all"
        >
          {{ store.params.sortDirection === 1 ? '↓ Azalan' : '↑ Artan' }}
        </button>
      </div>

      <div class="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
        <button
          v-for="n in [20, 50] as const"
          :key="n"
          @click="store.setTake(n)"
          :class="[
            'px-3 py-1 text-xs font-medium rounded-md transition-all',
            store.params.take === n
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          ]"
        >
          {{ n }} ilan
        </button>
      </div>
    </div>

    <!-- List -->
    <div v-if="store.isLoadingList && store.list.length === 0">Yükleniyor...</div>
    <div v-else-if="store.listError">{{ store.listError }}</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AdCard v-for="item in store.list" :key="item.id" :item="item" />
    </div>

    <!-- Sentinel -->
    <div ref="sentinel" class="h-10 flex items-center justify-center mt-4">
      <span v-if="store.isLoadingList && store.list.length > 0" class="text-sm text-gray-400">Yükleniyor...</span>
      <span v-else-if="!store.hasMore" class="text-sm text-gray-400">Tüm ilanlar yüklendi</span>
    </div>

    <!-- Filter Modal -->
    <FilterModal
      :isOpen="showFilter"
      :currentFilters="store.params"
      @close="showFilter = false"
      @apply="handleFilterApply"
      @reset="store.resetFilters"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from '@/stores/store'
import AdCard from '@/components/listing/Card.vue'
import FilterModal from '@/components/listing/FilterModal.vue'
import type { ListingParams, SortType } from '@/types'

const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const store = useStore()
const showFilter = ref(false)

const sortOptions = [
  { label: 'Fiyat', value: 0 as SortType },
  { label: 'Tarih', value: 1 as SortType },
  { label: 'Yıl', value: 2 as SortType },
]

function handleSort(sort: SortType) {
  store.fetchListings({ sort })
}

function toggleDirection() {
  store.fetchListings({ sortDirection: store.params.sortDirection === 1 ? 0 : 1 })
}

function handleFilterApply(filters: Partial<ListingParams>) {
  store.fetchListings(filters)
}

onMounted(async () => {
  await store.fetchListings()

  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting && !store.isLoadingList) {
      store.loadMore()
    }
  }, { threshold: 0 })

  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>