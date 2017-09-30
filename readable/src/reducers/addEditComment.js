import { ADD_NEW_COMMENT, UPDATE_COMMENT, OPEN_EDIT_COMMENT } from '../actions/types'

const addCommentValues = {
  body: "",
  author: ""
}

export default function addEditComment(state = addCommentValues, action) {
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