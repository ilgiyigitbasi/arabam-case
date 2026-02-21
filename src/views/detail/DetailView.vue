<template>
  <div class="max-w-[1440px] mx-auto px-6 py-6 space-y-8">

    <div v-if="store.selectedItem" class="flex flex-col lg:flex-row gap-8 items-start">

      <div class="lg:w-[55%] w-full space-y-6">
        <div class="ui-card photo-square">
          <PhotoSlider :photos="store.selectedItem.photos" />
        </div>
      </div>

      <div class="lg:w-[45%] w-full sticky top-6 space-y-4">

        <div class="ui-card info-content p-5">
          <h1>{{ store.selectedItem.title }}</h1>
          <p class="mt-1">{{ store.selectedItem.location.cityName }} · {{ store.selectedItem.dateFormatted }}</p>
          <div class="price-text mt-2 pt-2">{{ store.selectedItem.priceFormatted }}</div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div v-for="prop in store.selectedItem.properties" :key="prop.name" class="spec-item p-4">
            <span>{{ prop.name }}</span>
            <span>{{ prop.value }}</span>
          </div>
        </div>

        <div v-if="store.selectedItem.text" class="ui-card p-5">
          <h2 class="text-white font-black text-xl mb-6">İlan Açıklaması</h2>
          <div v-html="store.selectedItem.text" class="text-gray-400 leading-relaxed"></div>
        </div>

        <div class="ui-card p-7 space-y-6">
          <div class="flex items-center gap-4">
            <div class="user-avatar w-12 h-12 rounded-full flex items-center justify-center font-black text-lg">
              {{ store.selectedItem.userInfo.nameSurname.charAt(0) }}
            </div>
            <div>
              <div class="text-white font-bold">{{ store.selectedItem.userInfo.nameSurname }}</div>
              <div class="text-gray-500 text-[10px] font-black uppercase">Bireysel Satıcı</div>
            </div>
          </div>
          <a :href="`tel:${store.selectedItem.userInfo.phoneFormatted}`"
            class="call-btn flex items-center justify-center w-full py-2 rounded-2xl font-black text-sm shadow-lg">
            📞 {{ store.selectedItem.userInfo.phoneFormatted }}
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/stores/store'
import PhotoSlider from '@/components/detail/PhotoSlider.vue'

const props = defineProps<{ id: number }>()
const store = useStore()
onMounted(() => store.fetchDetail(props.id))
</script>

<style scoped src="./detail.css"></style>