export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const ADD_POST = 'ADD_POST'

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