import { combineReducers } from 'redux'

import {
  LOAD_CATEGORIES,
  LOAD_POSTS,
  ADD_POST,
  SELECT_POST,
  LOAD_COMMENTS,
  ADD_NEW_POST,
  UPDATE_POST,
  OPEN_EDIT_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_NEW_COMMENT,
  UPDATE_COMMENT,
  ADD_COMMENT,
  OPEN_EDIT_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPDATE_POST_VOTE,
  UPDATE_COMMENT_VOTE
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
    case EDIT_POST:
      return state.map((item, index) => {
        if (item.id === action.post.id) {
          return action.post
        }
        return item
      })
    case DELETE_POST:
      return state.filter((item, index) => {
        return item.id !== action.id
      })
    case UPDATE_POST_VOTE:
      return state.map((item, index) => {
        if (item.id === action.id) {
          let voteScore = action.option === 'upVote' ? item.voteScore + 1 : item.voteScore - 1
          return {
            ...item,
            'voteScore': voteScore
          }
        }
        return item
      })
    default:
      return state
  }
}

function selectedPost(state = {}, action) {
  switch(action.type) {
    case SELECT_POST:
      return Object.assign({}, action.selectedPost)
    case EDIT_POST:
      const { title, body, author, category } = action.post
      return {
        ...state,
        'title': title,
        'body': body,
        'author': author,
        'category': category
      }
    case UPDATE_POST_VOTE:
      let voteScore = action.option === 'upVote' ? state.voteScore + 1 : state.voteScore - 1
      return {
        ...state,
        'voteScore': voteScore
      }
    default:
      return state
  }
}

function comments(state = [], action) {
  switch(action.type) {
    case LOAD_COMMENTS:
      return Object.assign([], action.comments)
    case ADD_COMMENT:
      return [...state, action.comment]
    case EDIT_COMMENT:
      const { body, author } = action.comment
      return state.map((item, index) => {
        if (item.parentId === action.comment.parentId) {
          if (item.id === action.comment.id) {
            return {
              ...item,
              'body': body,
              'author': author
            }
          }
        }
        return item
      })
    case DELETE_COMMENT:
      return state.filter((item, index) => {
        return item.id !== action.id
      })
    case UPDATE_COMMENT_VOTE:
      return state.map((item, index) => {
        if (item.id === action.id) {
          let voteScore = action.option === 'upVote' ? item.voteScore + 1 : item.voteScore - 1
          return {
            ...item,
            'voteScore': voteScore
          }
        }
        return item
      })
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
    case OPEN_EDIT_POST:
      return Object.assign({}, action.post)
    default:
      return state
  }
}

const addCommentValues = {
  body: "",
  author: ""
}

function addEditComment(state = addCommentValues, action) {
  switch (action.type) {
    case ADD_NEW_COMMENT: 
      return Object.assign({}, addCommentValues)
    case UPDATE_COMMENT:
      return {
        ...state,
        [action.name]: action.value
      }
    case OPEN_EDIT_COMMENT:
      return Object.assign({}, action.comment)
    default:
      return state
  }
}

export default combineReducers({
  categories,
  post,
  selectedPost,
  comments,
  addEditPost,
  addEditComment
})