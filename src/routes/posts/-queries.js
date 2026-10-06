import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPost, deletePost, getPost, getPosts, updatePost } from '../../api/posts.js'

const postsKey = ['posts']

export function usePosts() {
  return useQuery({ queryKey: postsKey, queryFn: ({ signal }) => getPosts(signal) })
}

export function usePost(id) {
  return useQuery({ queryKey: [...postsKey, id], queryFn: ({ signal }) => getPost(id, signal) })
}

function usePostMutation(mutationFn, invalidateDetail = false) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: (_data, variables) => Promise.all([
      queryClient.invalidateQueries({ queryKey: postsKey, exact: true }),
      ...(invalidateDetail ? [queryClient.invalidateQueries({ queryKey: [...postsKey, variables.id] })] : []),
    ]),
  })
}

export function useCreatePost() {
  return usePostMutation(createPost)
}

export function useUpdatePost() {
  return usePostMutation(({ id, changes }) => updatePost(id, changes), true)
}

export function useDeletePost() {
  return usePostMutation(deletePost)
}