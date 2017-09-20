import { combineReducers } from 'redux'

import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  ADD_POST,
  SELECT_POST,
  LOAD_COMMENTS,
  ADD_NEW_POST,
  UPDATE_POST,
  EDIT_POST
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

function selectedPost(state = {}, action) {
  switch(action.type) {
    case SELECT_POST:
      return Object.assign({}, action.selectedPost)
    default:
      return state
  }
}

function comments(state = [], action) {
  switch(action.type) {
    case LOAD_COMMENTS:
      return Object.assign([], action.comments)
    default: 
      return state
  }
}

const addPostValues = {
  title: "",
  category: "",
  body: "",
  author:""
}

function addEditPost(state = addPostValues, action) {
  switch(action.type) {
    case ADD_NEW_POST: 
      return Object.assign({}, addPostValues)
    case UPDATE_POST:
      return {
        ...state,
        [action.name]: action.value
      }
    case EDIT_POST:
      return Object.assign({}, action.post)
    default:
      return state
  }
}

export default combineReducers({
  categories,
  post,
  selectedPost,
  comments,
  addEditPost
})