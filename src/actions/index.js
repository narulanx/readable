export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const SELECT_POST = 'SELECT_POST'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const EDIT_POST = 'EDIT_POST'

export function loadCategories(categories) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

export function loadPost(posts) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function selectPost(selectedPost) {
  return {
    type: SELECT_POST,
    selectedPost
  }
}

export function loadComments(comments) {
  return {
    type: LOAD_COMMENTS,
    comments
  }
}

export function openAddPost() {
  return {
    type: ADD_NEW_POST
  }
}

export function updatePost(name, value) {
  return {
    type: UPDATE_POST,
    name, 
    value
  }
}

export function openEditPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}