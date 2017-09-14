import { combineReducers } from 'redux'

import {
  LOAD_POSTS
} from '../actions'

function post(state = [], action) {
  switch(action.type) {
    case LOAD_POSTS: 
      return Object.assign([], action.posts)
    default :
      return state
  }
}

export default combineReducers({
  post
})