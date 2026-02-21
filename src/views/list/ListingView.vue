<template>
  <div class="max-w-[1400px] mx-auto px-6 py-10">

    <div class="flex items-center justify-between mb-10">
      <div class="space-y-1">
        <h1 class="page-title">İlanlar</h1>
        <p class="page-subtitle">Toplam {{ store.list.length }} aktif ilan listeleniyor</p>
      </div>
      <button @click="showFilter = true" class="filter-btn">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M7 8h10M11 12h4" />
        </svg>
        Filtrele
      </button>
    </div>

    <div class="toolbar">
      <div class="flex flex-wrap items-center gap-2">
        <button v-for="opt in sortOptions" :key="opt.value" @click="handleSort(opt.value)"
          :class="['sort-pill', store.params.sort === opt.value ? 'active' : '']">
          {{ opt.label }}
        </button>
        <button @click="toggleDirection" class="dir-btn">
          <span :class="['dir-arrow', store.params.sortDirection === 1 ? '' : 'rotate']">↓</span>
          {{ store.params.sortDirection === 1 ? 'Azalan' : 'Artan' }}
        </button>
      </div>

      <div class="flex items-center gap-1 take-group">
        <button v-for="n in [20, 50] as const" :key="n" @click="store.setTake(n)"
          :class="['take-btn', store.params.take === n ? 'active' : '']">
          {{ n }} İlan
        </button>
      </div>
    </div>


    <div v-if="store.listError" class="p-10 text-center rounded-2xl error-box">
      {{ store.listError }}
    </div>

    <div v-if="store.isLoadingList && store.list.length === 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="i in 10" :key="i" class="skeleton-card"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <AdCard v-for="item in store.list" :key="item.id" :item="item" />
    </div>

    <div ref="sentinel" class="py-20 flex flex-col items-center justify-center gap-4">
      <div v-if="store.isLoadingList" class="w-8 h-8 border-4 spinner"></div>
      <p v-else-if="!store.hasMore" class="end-text">Tüm sonuçlar görüntülendi</p>
    </div>

    <FilterModal :isOpen="showFilter" :currentFilters="store.params" @close="showFilter = false"
      @apply="handleFilterApply" @reset="store.resetFilters" />
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

function handleSort(sort: SortType) { store.fetchListings({ sort }) }
function toggleDirection() { store.fetchListings({ sortDirection: store.params.sortDirection === 1 ? 0 : 1 }) }
function handleFilterApply(filters: Partial<ListingParams>) { store.fetchListings(filters) }

onMounted(async () => {
  await store.fetchListings()
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry?.isIntersecting && !store.isLoadingList) store.loadMore()
  }, { threshold: 0 })
  if (sentinel.value) observer.observe(sentinel.value)
})

onUnmounted(() => { observer?.disconnect() })
</script>
<style scoped src="./listing.css"></style>