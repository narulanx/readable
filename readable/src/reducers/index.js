import { combineReducers } from 'redux'
import addEditComment from './addEditComment'
import addEditPost from './addEditPost'
import categories from './categories'
import comments from './comments'
import post from './post'
import selectedPost from './selectedPost'

export default combineReducers({
  categories,
  post,
  selectedPost,
  comments,
  addEditPost,
  addEditComment
})