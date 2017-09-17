import { combineReducers } from 'redux'

import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  ADD_POST
} from '../actions'

function categories(state = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES: 
      return Object.assign([], action.categories)
    default:
      return state
  }
}

function post(state = [], action) {
  switch(action.type) {
    case LOAD_POSTS: 
      return Object.assign([], action.posts)
    case ADD_POST:
      return [...state, action.post]
    default:
      return state
  }
}

export default combineReducers({
  categories,
  post
})