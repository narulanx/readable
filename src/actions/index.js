export const LOAD_POSTS = 'LOAD_POSTS'

export function loadPost(posts) {
    return {
        type: LOAD_POSTS,
        posts
    }
}