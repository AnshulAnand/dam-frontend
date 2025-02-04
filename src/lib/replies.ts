'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { GET, POST, PATCH, DELETE } from '@/utils/fetch'
import { IReply } from '@/types'

// GET Replies
export function useReplies(page: number, articleId: string, commentId: string) {
  const { data, error, isLoading } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/replies?page=${page}&limit=${10}&articleId=${articleId}&commentId=${commentId}`,
    GET
  )
  return {
    replies: data as Array<IReply>,
    isLoading,
    isError: error,
  }
}

// POST Reply
export function usePostReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/replies`,
    POST /* options */
  )

  return {
    triggerPostReply: trigger,
    postReplyError: error,
    isPostReplyMutating: isMutating,
  }
}

// EDIT Reply
export function useEditReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/replies`,
    PATCH /* options */
  )
  return {
    triggerEditReply: trigger,
    editReplyError: error,
    isEditReplyMutating: isMutating,
  }
}

// Delete Reply
export function useDeleteReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/replies`,
    DELETE /* options */
  )
  return {
    triggerDeleteReply: trigger,
    deleteReplyError: error,
    isDeleteReplyMutating: isMutating,
  }
}

// LIKE Reply
export function useLikeReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/replies/like`,
    POST /* options */
  )
  return {
    triggerLikeReply: trigger,
    likeReplyError: error,
    isLikeReplyMutating: isMutating,
  }
}

// CHECK whether user has already liked
export function useCheckReplyLike(replyId: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/replies/check-like/${replyId}`,
    GET
  )

  return {
    data,
    isLoading,
    isError: error,
  }
}
