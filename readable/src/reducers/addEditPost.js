import { ADD_NEW_POST, UPDATE_POST, OPEN_EDIT_POST } from '../actions/types'

const addPostValues = {
  title: "",
  category: "",
  body: "",
  author:""
}

export default function addEditPost(state = addPostValues, action) {
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