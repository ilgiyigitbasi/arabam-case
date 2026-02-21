<template>
  <div class="max-w-4xl mx-auto px-4 py-8">

    <div v-if="store.isLoadingDetail">Yükleniyor...</div>

    <div v-else-if="store.detailError">{{ store.detailError }}</div>

    <div v-else-if="store.selectedItem">
      <img
        :src="getPhotoUrl(store.selectedItem.photos[0] ?? '', '800x600')"
        :alt="store.selectedItem.title"
        class="w-full h-96 object-contain rounded-xl mb-6"
      />

      <div class="flex items-start justify-between mb-4">
        <h1 class="font-bold text-2xl text-gray-900">{{ store.selectedItem.title }}</h1>
        <span class="font-bold text-2xl text-gray-900 whitespace-nowrap ml-4">{{ store.selectedItem.priceFormatted }}</span>
      </div>
      <p class="text-gray-500 text-sm mb-6">
        {{ store.selectedItem.location.cityName }}, {{ store.selectedItem.location.townName }}
        · {{ store.selectedItem.dateFormatted }}
      </p>


      <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div
          v-for="prop in store.selectedItem.properties"
          :key="prop.name"
          class="bg-white rounded-lg p-3 border border-gray-100"
        >
          <p class="text-xs text-gray-400 mb-1">{{ prop.name }}</p>
          <p class="text-sm font-medium text-gray-900">{{ prop.value }}</p>
        </div>
      </div>

      <div v-if="store.selectedItem.text" class="bg-white rounded-xl p-5 border border-gray-100 mb-6">
        <h2 class="font-semibold text-gray-900 mb-3">Açıklama</h2>
        <div v-html="store.selectedItem.text" class="text-gray-600 text-sm leading-relaxed"></div>
      </div>

      <div class="bg-white rounded-xl p-5 border border-gray-100">
        <h2 class="font-semibold text-gray-900 mb-3">İlan Sahibi</h2>
        <p class="text-sm text-gray-900 font-medium">{{ store.selectedItem.userInfo.nameSurname }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ store.selectedItem.userInfo.phoneFormatted }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/stores/store'
import { getPhotoUrl } from '@/services/api'

const props = defineProps<{
  id: number
}>()

const store = useStore()

onMounted(() => {
  store.fetchDetail(props.id)
})
</script>