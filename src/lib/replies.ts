'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { GET, POST, PATCH, DELETE } from '@/utils/fetch'

// GET Comments
export function useReplies(page: number, articleId: string, commentId: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/replies?page=${page}&limit=${4}&articleId=${articleId}&commentId=${commentId}`,
    GET
  )
  return { replies: data, isLoading, isError: error }
}

// POST Reply
export function usePostReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/replies',
    POST /* options */
  )

  return {
    triggerPostReply: trigger,
    postReplyError: error,
  }
}

// EDIT Reply
export function useEditReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/replies',
    PATCH /* options */
  )
  return {
    triggerEditReply: trigger,
    editReplyError: error,
  }
}

// Delete Reply
export function useDeleteReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/replies',
    DELETE /* options */
  )
  return {
    triggerDeleteReply: trigger,
    deleteReplyError: error,
  }
}
