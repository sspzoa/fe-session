import { useState } from 'react'
import { usePosts } from '../hooks/usePosts.js'
import { useUsers } from '../hooks/useUsers.js'
import './UsersPage.css'

function Posts({ userId }) {
  const { posts, loading, error } = usePosts(userId)

  if (loading) return <p>글을 불러오는 중입니다…</p>
  if (error) return <p role="alert">{error}</p>

  return (
    <ul className="posts-list">
      {posts.map((post) => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}

export default function UsersPage() {
  const [search, setSearch] = useState('')

  const [selectedUserId, setSelectedUserId] = useState(null)
  const { users, loading, error } = useUsers()

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <main className="users-page">
      <header className="page-header">
        <h1>사용자 목록</h1>
        <p>사용자를 선택하면 작성한 글을 확인할 수 있습니다.</p>
      </header>
      <label className="search-label" htmlFor="user-search">이름 검색</label>
      <input
        className="search-input"
        id="user-search"
        type="search"
        placeholder="이름의 일부를 입력하세요"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {loading ? (
        <p role="status">사용자 목록을 불러오는 중입니다…</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <p className="users-count" role="status">{filteredUsers.length}명의 사용자</p>
          {filteredUsers.length > 0 && (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th scope="col">이름</th><th scope="col">이메일</th><th scope="col">회사명</th></tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className={selectedUserId === user.id ? 'selected' : undefined}>
                      <td>
                        <button className="user-button" type="button" onClick={() => setSelectedUserId(user.id)}>
                          {user.name}
                        </button>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.company.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      <section className="posts-section" aria-live="polite">
        <h2>글</h2>
        {selectedUserId === null ? (
          <p>사용자를 선택하세요</p>
        ) : (
          <Posts key={selectedUserId} userId={selectedUserId} />
        )}
      </section>
    </main>
  )
}
