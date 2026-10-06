import { css } from '../../../../styled-system/css'
import { useCreatePost, useUpdatePost } from '../-queries.js'
import { usePostDraftStore } from './store.js'
import { panel, field, button, primaryButton, actions, alert } from '../-style.js'

const fields = [
  { name: 'title', label: '제목' },
  { name: 'author', label: '작성자' },
  { name: 'content', label: '내용' },
]

function getLocalDate() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export default function PostForm({ postId, onSaved, onCancel }) {
  const draft = usePostDraftStore((state) => state.draft)
  const setField = usePostDraftStore((state) => state.setField)
  const resetDraft = usePostDraftStore((state) => state.resetDraft)
  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost()
  const isEditing = postId != null
  const mutation = isEditing ? updateMutation : createMutation

  async function handleSubmit(event) {
    event.preventDefault()
    const values = {
      title: draft.title.trim(),
      author: draft.author.trim(),
      content: draft.content.trim(),
    }
    if (Object.values(values).some((value) => !value)) return

    try {
      if (isEditing) await updateMutation.mutateAsync({ id: postId, changes: values })
      else await createMutation.mutateAsync({ ...values, createdAt: getLocalDate() })
      resetDraft()
      onSaved?.()
    } catch {
      return
    }
  }

  return (
    <section id="post-form" className={panel} aria-labelledby="post-form-title">
      <h2 id="post-form-title" className={css({ fontSize: 'xl', fontWeight: 'semibold' })}>{isEditing ? '글 수정하기' : '새 글 쓰기'}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map(({ name, label }) => (
          <div key={name} className={css({ mt: '4' })}>
            <label htmlFor={`post-${name}`} className={css({ display: 'block', mb: '2' })}>{label}</label>
            {name === 'content' ? (
              <textarea id={`post-${name}`} className={field} rows="5" required value={draft[name]} onChange={(event) => setField(name, event.target.value)} />
            ) : (
              <input id={`post-${name}`} className={field} required value={draft[name]} onChange={(event) => setField(name, event.target.value)} />
            )}
          </div>
        ))}
        <div className={actions}>
          <button className={primaryButton} type="submit" disabled={mutation.isPending}>{mutation.isPending ? '저장 중…' : isEditing ? '수정 완료' : '글 등록'}</button>
          {onCancel && <button className={button} type="button" disabled={mutation.isPending} onClick={() => { resetDraft(); onCancel() }}>취소</button>}
        </div>
      </form>
      {mutation.isError && <p className={alert} role="alert">저장에 실패했습니다. 서버를 확인하고 다시 시도하세요.</p>}
    </section>
  )
}