const POSTS_URL = 'http://localhost:3000/posts'

async function request(url, options) {
  const response = await fetch(url, options)
  if (!response.ok) {
    throw new Error(`요청에 실패했습니다. (HTTP ${response.status})`)
  }
  return response
}

export async function getBoardPosts(signal) {
  const response = await request(POSTS_URL, { signal })
  return response.json()
}

export async function createBoardPost(post) {
  const response = await request(POSTS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  return response.json()
}

export async function updateBoardPost(id, changes) {
  const response = await request(`${POSTS_URL}/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  })
  return response.json()
}

export async function deleteBoardPost(id) {
  await request(`${POSTS_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
}