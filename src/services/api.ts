import axios from 'axios'
import type { ListingParams } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    accept: 'text/plain',
  },
})

export const getListings = (params: ListingParams) => {
  return api.get('/listing', { params })
}

export const getDetail = (id: number) => {
  return api.get('/detail', { params: { id } })
}

export const getPhotoUrl = (url: string, resolution: '340x255' | '800x600' | '1280x960' = '800x600'): string => {
  if (!url) return ''
  return url.replace('{0}', resolution)
}