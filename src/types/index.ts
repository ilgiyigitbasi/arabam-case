export interface Location {
  cityName: string
  townName: string
}

export interface Category {
  id: number
  name: string
}

export interface Property {
  name: string
  value: string
}

export interface ListItem {
  id: number
  title: string
  location: Location
  category: Category
  modelName: string
  price: number
  priceFormatted: string
  date: string
  dateFormatted: string
  photo: string
  properties: Property[]
}

export interface UserInfo {
  id: number
  nameSurname: string
  phone: string
  phoneFormatted: string
}

export interface Detail {
  id: number
  title: string
  location: Location
  category: Category
  modelName: string
  price: number
  priceFormatted: string
  date: string
  dateFormatted: string
  photos: string[]
  properties: Property[]
  text: string
  userInfo: UserInfo
}

export interface ListingParams {
  take: 20 | 50
  sort?: 1 | 2 | 3  
  sortDirection?: 0 | 1  
  minDate?: string
  maxDate?: string
  categoryId?: number
  minYear?: number
  maxYear?: number
  minPrice?: number
  maxPrice?: number
}