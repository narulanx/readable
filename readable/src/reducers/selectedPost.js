import { SELECT_POST, EDIT_POST, UPDATE_POST_VOTE, DELETE_POST } from '../actions/types'

export default function selectedPost(state = {}, action) {
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
    case DELETE_POST:
      return {}
    default:
      return state
  }
}