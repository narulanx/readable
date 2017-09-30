import * as Types from './types'
import * as ReadableAPI from '../utils/ReadableAPI'

//Action to load comments
export function loadComments(comments) {
  return {
    type: Types.LOAD_COMMENTS,
    comments
  }
}

//Action to open modal for add comment
export function openAddComment(comment) {
  return {
    type: Types.ADD_NEW_COMMENT
  }
}

//Action to handle changes in the text fields for add/edit comments
export function updateComment(name, value) {
  return {
    type: Types.UPDATE_COMMENT,
    name, 
    value
  }
}

//Action to add a comment
export function addComment(comment) {
  return {
    type: Types.ADD_COMMENT,
    comment
  }
}

//Action to open modal for comments for editing
export function openEditComment(comment) {
  return {
    type: Types.OPEN_EDIT_COMMENT,
    comment
  }
}

//Action for editing a comment
export function editComment(comment) {
  return {
    type: Types.EDIT_COMMENT,
    comment
  }
}

//Action to delete a comment
export function deleteComment(id) {
  return {
    type: Types.DELETE_COMMENT,
    id
  }
}

//Action to update the votescore for comments
export function updateCommentVote(id, option) {
  return {
    type: Types.UPDATE_COMMENT_VOTE,
    id,
    option
  }
}

//Action to update the comment vote on click of a vote icon
export function clickVote(id, option) {
  return {
    type: Types.CLICK_VOTE,
    id,
    option
  }
}

//Thunk Middleware action creator to update post vote
export function updateApiCommentVote (id, option) {
  return function (dispatch) {
    dispatch(clickVote(id, option))
    return ReadableAPI.updateCommentVote(id, option).then(() => {
      dispatch(updateCommentVote(id, option))
    })
  }
}

//Action to create comment on click of submit
export function clickCreateComment(comment) {
  return {
    type: Types.CLICK_CREATE_COMMENT,
    comment
  }
}

//Thunk Middleware action creator to create comment
export function createApiComment (comment) {
  return function(dispatch) {
    dispatch(clickCreateComment(comment))
    return ReadableAPI.createComment(comment).then((data) => {
      dispatch(addComment(data))
    })
  }
}

//Action to edit comment on click of submit
export function clickEditComment(comment) {
  return {
    type: Types.CLICK_EDIT_COMMENT,
    comment
  }
}

//Thunk Middleware action creator to edit comment
export function editApiComment (comment) {
  return function(dispatch) {
    dispatch(clickEditComment(comment))
    return ReadableAPI.editComment(comment.id, comment).then((data) => {
      dispatch(editComment(comment))
    })
  }
}

//Action to delete comment on click of delete
export function clickDeleteComment(id) {
  return {
    type: Types.CLICK_DELETE_COMMENT,
    id
  }
}

//Thunk Middleware action creator to delete comment
export function deleteApiComment (id) {
  return function(dispatch) {
    dispatch(clickDeleteComment(id))
    return ReadableAPI.deleteComment(id).then(() => {
      dispatch(deleteComment(id))
    })
  }
}