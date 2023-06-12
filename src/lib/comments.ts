'use client'

import { DELETE, GET, PATCH, POST } from '@/utils/fetch'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

// GET Comments
export function useComments(page: number, articleId: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/comments?page=${page}&limit=${4}&articleId=${articleId}`,
    GET
  )
  return { comments: data, isLoading, isError: error }
}

// GET user Comments
export function useUserComments(articleId: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/comments/${articleId}`,
    GET
  )
  return { userComments: data, isLoading, isError: error }
}

// POST Comment
export function usePostComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments',
    POST /* options */
  )
  return {
    triggerPostComment: trigger,
    postCommentError: error,
  }
}

// EDIT Comment
export function useEditComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments',
    PATCH /* options */
  )
  return {
    triggerEditComment: trigger,
    editCommentError: error,
  }
}

// DELETE Comment
export function useDeleteComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments',
    DELETE /* options */
  )
  return {
    triggerDeleteComment: trigger,
    deleteCommentError: error,
  }
}

// LIKE Comment
export function useLikeComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments/like',
    POST /* options */
  )
  return {
    triggerLikeComment: trigger,
    likeCommentError: error,
  }
}
