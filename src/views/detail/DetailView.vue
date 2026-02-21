<template>
  <div class="max-w-[1440px] mx-auto px-6 py-6">
    <div v-if="store.selectedItem" class="flex flex-col lg:flex-row gap-8 items-start">

      <div class="lg:w-[55%] w-full">
        <div class="ui-card photo-square">
          <PhotoSlider :photos="store.selectedItem.photos" />
        </div>
      </div>

      <div class="lg:w-[45%] w-full space-y-4">

        <div class="ui-card info-content p-7">
          <h1>{{ store.selectedItem.title }}</h1>
          <p class="mt-2">{{ store.selectedItem.location.cityName }} · {{ store.selectedItem.dateFormatted }}</p>
          <div class="price-text mt-6 pt-6">{{ store.selectedItem.priceFormatted }}</div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div v-for="prop in store.selectedItem.properties" :key="prop.name" class="spec-item p-4">
            <span>{{ prop.name }}</span>
            <span>{{ prop.value }}</span>
          </div>
        </div>

        <div v-if="store.selectedItem.text" class="ui-card description-box p-7">
          <h2>İlan Açıklaması</h2>
          <div v-html="store.selectedItem.text" class="text-content"></div>
        </div>

        <div class="ui-card p-6 space-y-5">
          <div class="flex items-center gap-4">
            <div class="user-avatar w-10 h-10 rounded-full flex items-center justify-center font-black text-base">
              {{ store.selectedItem.userInfo.nameSurname.charAt(0) }}
            </div>
            <div>
              <div class="text-white font-bold text-sm">{{ store.selectedItem.userInfo.nameSurname }}</div>
              <div class="text-gray-500 text-[9px] font-black uppercase">Bireysel Satıcı</div>
            </div>
          </div>
          <a :href="`tel:${store.selectedItem.userInfo.phoneFormatted}`"
            class="call-btn flex items-center justify-center w-full py-4 rounded-xl font-black text-sm">
            📞 {{ store.selectedItem.userInfo.phoneFormatted }}
          </a>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped src="./detail.css"></style>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from '@/stores/store'
import PhotoSlider from '@/components/detail/PhotoSlider.vue'

const props = defineProps<{ id: number }>()
const store = useStore()
onMounted(() => store.fetchDetail(props.id))
</script>

<style scoped src="./detail.css"></style>