import { useEffect, useState } from 'react'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(USERS_URL)
        if (!response.ok) {
          throw new Error(`사용자 목록을 불러오지 못했습니다. (HTTP ${response.status})`)
        }
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        setError(error instanceof TypeError
          ? '사용자 목록을 불러오지 못했습니다.'
          : error.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return { users, loading, error }
}
