import { LOAD_COMMENTS, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT, UPDATE_COMMENT_VOTE } from '../actions/types'

export default function comments(state = [], action) {
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