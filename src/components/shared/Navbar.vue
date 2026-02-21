<template>
    <header class="sticky top-0 z-40 bg-surface-dark/80 backdrop-blur-md border-b border-white/5">
        <div class="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">

            <div class="flex items-center gap-2 group">
                <RouterLink to="/" class="font-black text-2xl tracking-tighter text-white">
                    arabam<span class="text-primary group-hover:animate-pulse">.</span>com
                </RouterLink>
            </div>

            <nav class="flex items-center gap-6">
                <RouterLink v-if="isDetailPage" to="/"
                    class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-gray hover:text-primary transition-all group">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span>
                    Geri Dön
                </RouterLink>

                <button v-else
                    class="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-all">
                    İlan Ver
                </button>
            </nav>

        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDetailPage = computed(() => route.name === 'detail')
</script>