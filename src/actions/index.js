export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function addPost({ category, title, body, author, timestamp, voteScore }) {
    return {
        type: ADD_POST,
        category, title, body, author, timestamp, voteScore
    }
}

export function editPost({ postId, title, body, author, timestamp, voteScore }) {
    return {
        type: EDIT_POST,
        postId, title, body, author, timestamp, voteScore
    }
}

export function deletePost({ postId }) {
    return {
        type: DELETE_POST,
        postId
    }
}

export function addComment({ postId, body, author, timestamp, voteScore }) {
    return {
        type: ADD_COMMENT,
        postId, body, author, timestamp, voteScore
    }
}

export function editComment({ commentId, body, author, timestamp, voteScore }) {
    return {
        type: EDIT_COMMENT,
        commentId, body, author, timestamp, voteScore
    }
}

export function deleteComment({ commentId }) {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}