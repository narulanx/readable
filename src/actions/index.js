export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const SELECT_POST = 'SELECT_POST'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const OPEN_EDIT_POST = 'OPEN_EDIT_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const OPEN_EDIT_COMMENT = 'OPEN_EDIT_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

// Action to load categories
export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

// Action to load posts
export function loadPost(posts) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

//Action to add a post
export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

//Action to select a post for view/edit
export function selectPost(selectedPost) {
  return {
    type: SELECT_POST,
    selectedPost
  }
}

//Action to load comments
export function loadComments(comments) {
  return {
    type: LOAD_COMMENTS,
    comments
  }
}

//Action to open add/edit post view for creating a new post
export function openAddPost() {
  return {
    type: ADD_NEW_POST
  }
}

//Action to handle changes in the text fields for add/edit post view
export function updatePost(name, value) {
  return {
    type: UPDATE_POST,
    name, 
    value
  }
}

//Action to open add/edit post view for editing
export function openEditPost(post) {
  return {
    type: OPEN_EDIT_POST,
    post
  }
}

//Action to edit a post
export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

//Action to delete a post
export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

//Action to open modal for add comment
export function openAddComment(comment) {
  return {
    type: ADD_NEW_COMMENT
  }
}

//Action to handle changes in the text fields for add/edit comments
export function updateComment(name, value) {
  return {
    type: UPDATE_COMMENT,
    name, 
    value
  }
}

//Action to add a comment
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

//Action to open modal for comments for editing
export function openEditComment(comment) {
  return {
    type: OPEN_EDIT_COMMENT,
    comment
  }
}

//Action for editing a comment
export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

//Action to delete a comment
export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}