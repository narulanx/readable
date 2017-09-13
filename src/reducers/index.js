import { combineReducers } from 'redux'

import {
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SELECT_CATEGORY
} from '../actions'

function category(state = {}, action) {
  switch(action.type) {
    case SELECT_CATEGORY :
      return {
        ...state,
        ...action.category
      }
    default :
      return state
  }
}

function post(state = [], action) {
  switch(action.type) {
    case LOAD_POSTS: 
      return Object.assign([], action.posts)
    case ADD_POST : 
      const { category, title, body, author, timestamp, voteScore } = action
      return [
        ...state,
        {category, title, body, author, timestamp, voteScore}  
      ]
    case EDIT_POST :
      return state.map((post) => {
        if (post.id !== action.postId) {
          return post;
        }
        return {
          ...post,
          ...action.title, 
          ...action.body, 
          ...action.author, 
          ...action.timestamp, 
          ...action.voteScore
        }
      })
    case DELETE_POST :
      const index = state.findIndex((post) => { return post.id === action.postId; })
      return [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ]
    default :
      return state
  }
}

function comment(state = {}, action) {
  switch(action.type) {
    case ADD_COMMENT : 
      const { postId, body, author, timestamp, voteScore } = action
      return [
        ...state,
        {postId, body, author, timestamp, voteScore}  
      ]
    case EDIT_COMMENT :
      return state.map((comment) => {
        if (comment.id !== action.commentId) {
          return comment;
        }
        return {
          ...comment,
          ...action.body, 
          ...action.author, 
          ...action.timestamp, 
          ...action.voteScore
        }
      })
    case DELETE_COMMENT :
      const index = state.findIndex((comment) => { return comment.id === action.commentId; })
      return [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ]
    default :
      return state
  }
}

export default combineReducers({
  category,
  post,
  comment
})