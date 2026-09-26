import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { css } from '../../../../styled-system/css'
import { usePost, useDeletePost } from '../hooks/usePosts.js'
import { usePostDraftStore } from '../store/usePostDraftStore.js'
import { page, panel, button, actions, muted, alert } from '../styles/postStyles.js'
import PostForm from '../components/PostForm.jsx'

export default function PostDetailPage() {
  useEffect(() => () => usePostDraftStore.getState().resetDraft(), [])
  const { postId } = useParams({ from: '/posts/$postId' })
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const postQuery = usePost(postId)
  const deleteMutation = useDeletePost()
  const loadPost = usePostDraftStore((state) => state.loadPost)

  async function handleDelete() {
    try {
      await deleteMutation.mutateAsync(postId)
      navigate({ to: '/posts' })
    } catch {
      return
    }
  }

  return (
    <main className={page}>
      <Link to="/posts" className={css({ color: 'gray.600', fontSize: 'sm', _hover: { textDecoration: 'underline' } })}>← 글 목록</Link>
      {postQuery.isPending && <p role="status">글을 불러오는 중입니다…</p>}
      {postQuery.isError && (
        <section className={panel}>
          <p className={alert} role="alert">글을 찾지 못했거나 서버에 연결할 수 없습니다.</p>
          <button className={button} type="button" onClick={() => postQuery.refetch()}>다시 불러오기</button>
        </section>
      )}
      {postQuery.isSuccess && (
        <>
          <article className={css({ py: '8', borderBottomWidth: '1px', borderColor: 'gray.200' })}>
            <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>{postQuery.data.title}</h1>
            <p className={muted}>{postQuery.data.author} · {postQuery.data.createdAt}</p>
            <p className={css({ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', my: '4' })}>{postQuery.data.content}</p>
            <div className={actions}>
              {!isEditing && <button className={button} type="button" onClick={() => { loadPost(postQuery.data); setIsEditing(true) }}>수정</button>}
              <button className={button} type="button" disabled={deleteMutation.isPending} onClick={handleDelete}>삭제</button>
            </div>
            {deleteMutation.isError && <p className={alert} role="alert">삭제에 실패했습니다. 다시 시도하세요.</p>}
          </article>
          {isEditing && <PostForm postId={postId} onSaved={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />}
        </>
      )}
    </main>
  )
}
