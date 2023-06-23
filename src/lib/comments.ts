'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { DELETE, GET, PATCH, POST } from '@/utils/fetch'
import { IComment } from '@/types'

// GET Comments
export function useComments(page: number, articleId: string) {
  const { data, error, isLoading } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/comments?page=${page}&limit=${10}&articleId=${articleId}`,
    GET
  )
  return {
    comments: data as Array<IComment>,
    isLoading,
    isError: error,
  }
}

// GET user Comments
export function useUserComments(articleId: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${articleId}`,
    GET
  )
  return {
    userComments: data as Array<IComment>,
    isLoading,
    isError: error,
  }
}

// POST Comment
export function usePostComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/comments`,
    POST /* options */
  )
  return {
    triggerPostComment: trigger,
    postCommentError: error,
    isPostCommentMutating: isMutating,
  }
}

// EDIT Comment
export function useEditComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/comments`,
    PATCH /* options */
  )
  return {
    triggerEditComment: trigger,
    editCommentError: error,
    isEditCommentMutating: isMutating,
  }
}

// DELETE Comment
export function useDeleteComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/comments`,
    DELETE /* options */
  )
  return {
    triggerDeleteComment: trigger,
    deleteCommentError: error,
    isDeleteCommentMutating: isMutating,
  }
}

// LIKE Comment
export function useLikeComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/like`,
    POST /* options */
  )
  return {
    triggerLikeComment: trigger,
    likeCommentError: error,
    isLikeCommentMutating: isMutating,
  }
}

// CHECK whether user has already liked
export function useCheckCommentLike(commentId: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/check-like/${commentId}`,
    GET
  )

  return {
    data,
    isLoading,
    isError: error,
  }
}
