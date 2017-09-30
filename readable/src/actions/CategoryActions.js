import { LOAD_CATEGORIES } from './types'

// Action to load categories
export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}