import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ListItem, Detail, ListingParams } from '@/types'
import { getListings, getDetail } from '@/services/api'

export const useStore = defineStore('listings', () => {
  const list = ref<ListItem[]>([])
  const selectedItem = ref<Detail | null>(null)
  const isLoadingList = ref(false)
  const isLoadingDetail = ref(false)
  const listError = ref<string | null>(null)
  const detailError = ref<string | null>(null)
  const params = ref<ListingParams>({ take: 20, sort: 2, sortDirection: 1 })

const skip = ref(0)
const hasMore = ref(true)

async function fetchListings(newParams?: Partial<ListingParams>) {
  params.value = { ...params.value, ...newParams }
  skip.value = 0
  list.value = []
  hasMore.value = true
  await fetchPage()
}

async function loadMore() {
  console.log('loadMore called, scroll:', window.scrollY)
  if (!hasMore.value || isLoadingList.value) return
  await fetchPage()
  console.log('after fetchPage, scroll:', window.scrollY)
}

async function fetchPage() {
  isLoadingList.value = true
  listError.value = null
  try {
    const response = await getListings({ ...params.value, skip: skip.value })
    const newItems = response.data
    list.value.push(...newItems)
    skip.value += params.value.take
    hasMore.value = newItems.length === params.value.take
  } catch (err) {
    listError.value = 'İlanlar yüklenirken bir hata oluştu.'
    console.error(err)
  } finally {
    isLoadingList.value = false
  }
}

  async function fetchDetail(id: number) {
    isLoadingDetail.value = true
    detailError.value = null
    selectedItem.value = null
    try {
      const response = await getDetail(id)
      selectedItem.value = response.data
    } catch (err) {
      detailError.value = 'İlan detayı yüklenirken bir hata oluştu.'
      console.error(err)
    } finally {
      isLoadingDetail.value = false
    }
  }

  function setTake(take: 20 | 50) {
    params.value.take = take
    fetchListings()
  }

  function resetFilters() {
    params.value = { take: params.value.take, sort: 2, sortDirection: 1 }
    fetchListings()
  }

  return {
    list,
    selectedItem,
    isLoadingList,
    isLoadingDetail,
    listError,
    detailError,
    params,
    fetchListings,
    fetchDetail,
    setTake,
    resetFilters,
    loadMore,
    hasMore,
    skip
  }
})