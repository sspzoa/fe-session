import { useState } from 'react'
import { useBoardPosts } from '../hooks/useBoardPosts.js'
import './PostsPage.css'

const emptyDraft = { title: '', content: '', author: '' }

function today() {
  const date = new Date()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export default function PostsPage() {
  const { posts, loading, error, actionError, saving, retry, createPost, updatePost, deletePost } = useBoardPosts()
  const [draft, setDraft] = useState(emptyDraft)
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.trim().toLowerCase()),
  )

  function editPost(post) {
    setEditingId(post.id)
    setDraft({ title: post.title, content: post.content, author: post.author })
  }

  function cancelEdit() {
    setEditingId(null)
    setDraft(emptyDraft)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const values = {
      title: draft.title.trim(),
      content: draft.content.trim(),
      author: draft.author.trim(),
    }
    if (!values.title || !values.content || !values.author) return

    const succeeded = editingId === null
      ? await createPost({ ...values, createdAt: today() })
      : await updatePost(editingId, values)
    if (succeeded) cancelEdit()
  }

  return (
    <main className="board-page">
      <header>
        <h1>게시판</h1>
        <p>글을 쓰고, 고치고, 지워 보세요.</p>
      </header>

      <section className="board-panel" aria-labelledby="post-form-title">
        <h2 id="post-form-title">{editingId === null ? '새 글 쓰기' : '글 수정하기'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="post-title">제목</label>
          <input id="post-title" required value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
          <label htmlFor="post-author">작성자</label>
          <input id="post-author" required value={draft.author} onChange={(event) => setDraft({ ...draft, author: event.target.value })} />
          <label htmlFor="post-content">내용</label>
          <textarea id="post-content" rows="5" required value={draft.content} onChange={(event) => setDraft({ ...draft, content: event.target.value })} />
          <div className="board-actions">
            <button type="submit" disabled={saving || loading || Boolean(error)}>{saving ? '저장 중…' : editingId === null ? '글 등록' : '수정 완료'}</button>
            {editingId !== null && <button type="button" disabled={saving} onClick={cancelEdit}>취소</button>}
          </div>
        </form>
        {actionError && <p role="alert">{actionError}</p>}
      </section>

      <section className="board-panel" aria-labelledby="posts-title">
        <h2 id="posts-title">글 목록</h2>
        <label htmlFor="post-search">제목 검색</label>
        <input id="post-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="제목을 입력하세요" />
        {loading ? (
          <p role="status">글을 불러오는 중입니다…</p>
        ) : error ? (
          <div><p role="alert">{error}</p><button type="button" onClick={retry}>다시 불러오기</button></div>
        ) : filteredPosts.length === 0 ? (
          <p>{search.trim() ? '검색 결과가 없습니다.' : '아직 글이 없습니다.'}</p>
        ) : (
          <ul className="board-posts">
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p className="post-meta">{post.author} · {post.createdAt}</p>
                <p className="post-content">{post.content}</p>
                <div className="board-actions">
                  <button type="button" disabled={saving} onClick={() => editPost(post)}>수정</button>
                  <button type="button" disabled={saving} onClick={() => deletePost(post.id)}>삭제</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}