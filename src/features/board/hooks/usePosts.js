import { useEffect, useState } from 'react'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

export function usePosts(userId) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(`${POSTS_URL}?userId=${userId}`)
        if (!response.ok) {
          throw new Error(`글 목록을 불러오지 못했습니다. (HTTP ${response.status})`)
        }
        const data = await response.json()
        setPosts(data)
      } catch (error) {
        setError(error instanceof TypeError ? '글 목록을 불러오지 못했습니다.' : error.message)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [userId])

  return { posts, loading, error }
}
