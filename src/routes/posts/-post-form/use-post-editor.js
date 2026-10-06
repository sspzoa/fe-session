import { useEffect, useState } from 'react'
import { usePostDraftStore } from './store.js'

export function usePostEditor() {
  const [isOpen, setIsOpen] = useState(false)
  const loadPost = usePostDraftStore((state) => state.loadPost)
  const resetDraft = usePostDraftStore((state) => state.resetDraft)

  useEffect(() => resetDraft, [resetDraft])

  function open(post) {
    if (post) loadPost(post)
    else resetDraft()
    setIsOpen(true)
  }

  function close() {
    resetDraft()
    setIsOpen(false)
  }

  return { isOpen, open, close }
}
