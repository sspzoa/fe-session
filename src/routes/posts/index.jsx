import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { css } from '../../../styled-system/css'
import { usePosts } from './-queries.js'
import PostForm from './-post-form/index.jsx'
import { usePostEditor } from './-post-form/use-post-editor.js'
import { page, field, button, primaryButton, muted, alert } from './-style.js'

export default function PostsPage() {
  const [search, setSearch] = useState('')
  const editor = usePostEditor()
  const postsQuery = usePosts()
  const filteredPosts = (postsQuery.data ?? []).filter((post) =>
    post.title.toLowerCase().includes(search.trim().toLowerCase()),
  )

  return (
    <main className={page}>
      <header className={css({ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '4', mb: '10' })}>
        <div>
          <h1 className={css({ fontSize: '3xl', fontWeight: 'bold', letterSpacing: 'tight' })}>게시판</h1>
          <p className={css({ color: 'gray.500', fontSize: 'sm', mt: '2' })}>글을 모아 보는 공간</p>
        </div>
        <button className={primaryButton} type="button" aria-expanded={editor.isOpen} aria-controls="post-form" onClick={() => editor.isOpen ? editor.close() : editor.open()}>
          {editor.isOpen ? '닫기' : '글쓰기'}
        </button>
      </header>

      {editor.isOpen && <PostForm onSaved={editor.close} onCancel={editor.close} />}

      <section aria-labelledby="posts-title">
        <div className={css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4', mb: '4' })}>
          <h2 id="posts-title" className={css({ fontSize: 'lg', fontWeight: 'semibold' })}>전체 글</h2>
          {postsQuery.isSuccess && <span className={muted}>{postsQuery.data.length}개</span>}
        </div>
        <label htmlFor="post-search" className={css({ srOnly: true })}>제목 검색</label>
        <input id="post-search" className={field} type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="제목 검색" />

        {postsQuery.isPending && <p className={css({ py: '8', color: 'gray.500' })} role="status">글을 불러오는 중입니다…</p>}
        {postsQuery.isError && (
          <div className={css({ py: '8' })}>
            <p role="alert" className={alert}>글 목록을 불러오지 못했습니다. 서버를 확인하세요.</p>
            <button className={button} type="button" onClick={() => postsQuery.refetch()}>다시 불러오기</button>
          </div>
        )}
        {postsQuery.isSuccess && filteredPosts.length === 0 && (
          <p className={css({ py: '8', color: 'gray.500' })}>{search.trim() ? '검색 결과가 없습니다.' : '아직 글이 없습니다.'}</p>
        )}
        {postsQuery.isSuccess && filteredPosts.length > 0 && (
          <ul className={css({ listStyle: 'none', p: '0', mt: '5', borderTopWidth: '1px', borderColor: 'gray.200' })}>
            {filteredPosts.map((post) => (
              <li key={post.id} className={css({ py: '5', borderBottomWidth: '1px', borderColor: 'gray.200' })}>
                <h3 className={css({ fontSize: 'md', fontWeight: 'semibold' })}>
                  <Link to="/posts/$postId" params={{ postId: String(post.id) }} className={css({ color: 'gray.900', _hover: { textDecoration: 'underline' }, _focusVisible: { outlineWidth: '2px', outlineColor: 'gray.700' } })}>{post.title}</Link>
                </h3>
                <p className={css({ color: 'gray.600', fontSize: 'sm', mt: '2', lineClamp: 2, overflowWrap: 'anywhere' })}>{post.content}</p>
                <p className={css({ color: 'gray.500', fontSize: 'xs', mt: '3' })}>{post.author} · {post.createdAt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
