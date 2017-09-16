import { combineReducers } from 'redux'
import { guid } from '../utils/helpers'

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
      let post = action.post
      post.id = guid()
      post.timestamp = new Date()
      post.voteScore = 0
      post.deleted = false
      return [...state, post]
    default:
      return state
  }
}

export default combineReducers({
  categories,
  post
})