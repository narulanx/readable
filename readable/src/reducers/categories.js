import { LOAD_CATEGORIES } from '../actions/types'

export default function categories(state = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES: 
      return Object.assign([], action.categories)
    default:
      return state
  }
}