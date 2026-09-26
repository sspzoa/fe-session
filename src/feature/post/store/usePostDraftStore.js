import { create } from 'zustand'

const emptyDraft = { title: '', author: '', content: '' }

export const usePostDraftStore = create((set) => ({
  draft: emptyDraft,
  setField: (field, value) => set((state) => ({ draft: { ...state.draft, [field]: value } })),
  loadPost: (post) => set({ draft: { title: post.title, author: post.author, content: post.content } }),
  resetDraft: () => set({ draft: emptyDraft }),
}))