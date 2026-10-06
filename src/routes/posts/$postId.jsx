import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { css } from '../../../styled-system/css'
import { usePost, useDeletePost } from './-queries.js'
import { usePostEditor } from './-post-form/use-post-editor.js'
import { page, panel, button, actions, muted, alert } from './-style.js'
import PostForm from './-post-form/index.jsx'

export default function PostDetailPage() {
  const { postId } = useParams({ from: '/posts/$postId' })
  const navigate = useNavigate()
  const editor = usePostEditor()
  const postQuery = usePost(postId)
  const deleteMutation = useDeletePost()

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
              {!editor.isOpen && <button className={button} type="button" onClick={() => editor.open(postQuery.data)}>수정</button>}
              <button className={button} type="button" disabled={deleteMutation.isPending} onClick={handleDelete}>삭제</button>
            </div>
            {deleteMutation.isError && <p className={alert} role="alert">삭제에 실패했습니다. 다시 시도하세요.</p>}
          </article>
          {editor.isOpen && <PostForm postId={postId} onSaved={editor.close} onCancel={editor.close} />}
        </>
      )}
    </main>
  )
}
