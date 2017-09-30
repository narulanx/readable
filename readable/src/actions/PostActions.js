import * as Types from './types'
import * as ReadableAPI from '../utils/ReadableAPI'

// Action to load posts
export function loadPost(posts) {
  return {
    type: Types.LOAD_POSTS,
    posts
  }
}

//Action to add a post
export function addPost(post) {
  return {
    type: Types.ADD_POST,
    post
  }
}

//Action to select a post for view/edit
export function selectPost(selectedPost) {
  return {
    type: Types.SELECT_POST,
    selectedPost
  }
}

//Action to open add/edit post view for creating a new post
export function openAddPost() {
  return {
    type: Types.ADD_NEW_POST
  }
}

//Action to handle changes in the text fields for add/edit post view
export function updatePost(name, value) {
  return {
    type: Types.UPDATE_POST,
    name, 
    value
  }
}

//Action to open add/edit post view for editing
export function openEditPost(post) {
  return {
    type: Types.OPEN_EDIT_POST,
    post
  }
}

//Action to edit a post
export function editPost(post) {
  return {
    type: Types.EDIT_POST,
    post
  }
}

//Action to delete a post
export function deletePost(id) {
  return {
    type: Types.DELETE_POST,
    id
  }
}

//Action to update the votescore for posts
export function updatePostVote(id, option) {
  return {
    type: Types.UPDATE_POST_VOTE,
    id,
    option
  }
}

//Action to update the posts on click of a category
export function clickCategory(category) {
  return {
    type: Types.CLICK_CATEGORY,
    category
  }
}

//Thunk Middleware action creator to fetch posts
export function fetchPosts(category) {
  return function (dispatch) {
    dispatch(clickCategory(category))
    return ReadableAPI.getCategoryPosts(category)
      .then(json => {
        const posts = json.map((post) => {
          return ReadableAPI.getComments(post.id).then((comment) => {
            post.commentCount = comment.length
            return post
          })
        })
        Promise.all(posts).then((post) => {
          dispatch(loadPost(post))
        })
      })
  }
}

//Action to update the post vote on click of a vote icon
export function clickVote(id, option) {
  return {
    type: Types.CLICK_VOTE,
    id,
    option
  }
}

//Thunk Middleware action creator to update post vote
export function updateApiPostVote (id, option) {
  return function (dispatch) {
    dispatch(clickVote(id, option))
    return ReadableAPI.updatePostVote(id, option).then(() => {
      dispatch(updatePostVote(id, option))
    })
  }
}

//Action to create comment on click of submit
export function clickCreatePost(post) {
  return {
    type: Types.CLICK_CREATE_POST,
    post
  }
}

//Thunk Middleware action creator to create comment
export function createApiPost (post) {
  return function(dispatch) {
    dispatch(clickCreatePost(post))
    return ReadableAPI.createPost(post).then((data) => {
      dispatch(addPost(data))
    })
  }
}

//Action to edit comment on click of submit
export function clickEditPost(post) {
  return {
    type: Types.CLICK_EDIT_POST,
    post
  }
}

//Thunk Middleware action creator to edit comment
export function editApiPost (post) {
  return function(dispatch) {
    dispatch(clickEditPost(post))
    return ReadableAPI.editPost(post.id, post).then((data) => {
      dispatch(editPost(post))
    })
  }
}

//Action to delete comment on click of delete
export function clickDeletePost(id) {
  return {
    type: Types.CLICK_DELETE_POST,
    id
  }
}

//Thunk Middleware action creator to delete comment
export function deleteApiPost (id) {
  return function(dispatch) {
    dispatch(clickDeletePost(id))
    return ReadableAPI.deletePost(id).then(() => {
      dispatch(deletePost(id))
    })
  }
}

//Action to add comment count to a post
export function addCommentCount(id, commentCount) {
  return {
    type: Types.ADD_COMMENT_COUNT,
    id,
    commentCount
  }
}