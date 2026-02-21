<template>
  <div class="max-w-[1400px] mx-auto px-6 py-10">
    <div class="flex items-center justify-between mb-10 pb-">
      <div class="space-y-1">
        <h1 class="text-text-white font-black text-2xl tracking-tight leading-none">İlanlar</h1>
        <p class="text-text-gray text-sm font-medium">Toplam {{ store.list.length }} aktif ilan listeleniyor</p>
      </div>

      <button @click="showFilter = true"
        class="flex items-center gap-3 px-6 py-3 bg-surface-card border border-white/10 rounded-2xl text-sm font-bold text-white hover:bg-surface-alt hover:border-primary/40 transition-all shadow-xl group">
        <svg class="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-500" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h18M7 8h10M11 12h4" />
        </svg>
        Filtrele
      </button>
    </div>

    <div
      class="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4 bg-surface-card/30 p-2 rounded-[22px] border border-white/5 shadow-inner">
      <div class="flex flex-wrap items-center gap-2">
        <div class="px-4 py-2 border-r border-white/10 mr-2 hidden md:block">
          <span class="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Sırala</span>
        </div>

        <button v-for="opt in sortOptions" :key="opt.value" @click="handleSort(opt.value)" :class="[
          'px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300',
          store.params.sort === opt.value
            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
            : 'text-text-gray hover:text-white hover:bg-white/5'
        ]">
          {{ opt.label }}
        </button>

        <button @click="toggleDirection"
          class="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-black bg-transparent text-text-gray hover:text-white hover:bg-white/5 transition-all active:scale-95">
          <span :class="store.params.sortDirection === 1 ? 'rotate-0' : 'rotate-180'"
            class="transition-transform duration-500 text-primary text-base leading-none">
            ↓
          </span>
          <span class="uppercase tracking-tight">
            {{ store.params.sortDirection === 1 ? 'Azalan' : 'Artan' }}
          </span>
        </button>
      </div>

      <div class="flex items-center gap-1 bg-surface-dark/50 p-1 rounded-lg border border-white/5">
        <button v-for="n in [20, 50] as const" :key="n" @click="store.setTake(n)" :class="[
          'px-5 py-1.5 text-[11px] font-black uppercase rounded-lg transition-all',
          store.params.take === n
            ? 'bg-white text-black shadow-md'
            : 'text-text-muted hover:text-text-gray'
        ]">
          {{ n }} İlan
        </button>
      </div>
    </div>

    <div v-if="store.listError"
      class="p-10 text-center bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
      {{ store.listError }}
    </div>

    <div v-if="store.isLoadingList && store.list.length === 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="i in 10" :key="i" class="aspect-[4/5] bg-surface-card rounded-3xl animate-pulse"></div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <AdCard v-for="item in store.list" :key="item.id" :item="item" />
    </div>

    <div ref="sentinel" class="py-20 flex flex-col items-center justify-center gap-4">
      <div v-if="store.isLoadingList"
        class="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p v-else-if="!store.hasMore" class="text-text-muted text-[10px] font-black uppercase tracking-[0.3em]">
        Tüm sonuçlar görüntülendi
      </p>
    </div>

    <FilterModal :isOpen="showFilter" :currentFilters="store.params" @close="showFilter = false"
      @apply="handleFilterApply" @reset="store.resetFilters" />
  </div>
</template>

<script setup lang="ts">
// Mevcut script logic'in tamamen aynı kalıyor (Hiçbir şeyi bozmadım)
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