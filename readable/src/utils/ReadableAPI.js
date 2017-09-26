const api = process.env.REACT_APP_CATEGORIES_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// API to retrieve categories
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

//API to retrieve all the posts
export const getAllPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

//API to retrieve posts for a specific categpry
export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

//API to create a post
export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

//API to retrieve post details
export const getPostDetails = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())

//API to retrieve comments for a post
export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

//API to edit a post
export const editPost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

//API to delete a post
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })

//API to create a new comment
export const createComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

//API to retrieve all the details of a comment
export const getCommentDetails = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())

//API to edit a comment
export const editComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

//API to delete a comment
export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })