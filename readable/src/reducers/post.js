import { LOAD_POSTS, ADD_POST, EDIT_POST, DELETE_POST, UPDATE_POST_VOTE } from '../actions/types'

export default function post(state = [], action) {
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