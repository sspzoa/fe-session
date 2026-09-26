import { useEffect, useState } from 'react'
import { createBoardPost, deleteBoardPost, getBoardPosts, updateBoardPost } from '../api.js'

export function useBoardPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [saving, setSaving] = useState(false)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPosts() {
      try {
        const data = await getBoardPosts(controller.signal)
        setPosts(data)
        setError('')
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error instanceof TypeError ? '글 목록을 불러오지 못했습니다. 서버가 켜져 있는지 확인하세요.' : error.message)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadPosts()
    return () => controller.abort()
  }, [reloadCount])

  function retry() {
    setLoading(true)
    setReloadCount((count) => count + 1)
  }

  async function runAction(action) {
    setSaving(true)
    setActionError('')
    try {
      await action()
      return true
    } catch (error) {
      setActionError(error instanceof TypeError ? '서버에 연결하지 못했습니다. 서버가 켜져 있는지 확인하세요.' : error.message)
      return false
    } finally {
      setSaving(false)
    }
  }

  function createPost(post) {
    return runAction(async () => {
      const created = await createBoardPost(post)
      setPosts((current) => [...current, created])
    })
  }

  function updatePost(id, changes) {
    return runAction(async () => {
      const updated = await updateBoardPost(id, changes)
      setPosts((current) => current.map((post) => post.id === id ? updated : post))
    })
  }

  function deletePost(id) {
    return runAction(async () => {
      await deleteBoardPost(id)
      setPosts((current) => current.filter((post) => post.id !== id))
    })
  }

  return { posts, loading, error, actionError, saving, retry, createPost, updatePost, deletePost }
}