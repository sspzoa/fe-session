import ky from 'ky'

const api = ky.create({ prefix: 'http://localhost:3000', retry: { limit: 0 } })

export function getPosts(signal) {
  return api.get('posts', { signal }).json()
}

export function getPost(id, signal) {
  return api.get(`posts/${encodeURIComponent(id)}`, { signal }).json()
}

export function createPost(post) {
  return api.post('posts', { json: post }).json()
}

export function updatePost(id, changes) {
  return api.patch(`posts/${encodeURIComponent(id)}`, { json: changes }).json()
}

export async function deletePost(id) {
  await api.delete(`posts/${encodeURIComponent(id)}`)
}