'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

// GET Comments
async function getComments(url: string) {
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useComments(page: number, articleId: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/comments?page=${page}&limit=${4}&articleId=${articleId}`,
    getComments
  )
  return { comments: data, isLoading, isError: error }
}

// POST Comment
async function postComment(url: string, { arg }: { arg: { comment: any } }) {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.comment),
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function usePostComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments',
    postComment /* options */
  )
  return {
    triggerPostComment: trigger,
    postCommentError: error,
  }
}

// EDIT Comment
async function editComment(
  url: string,
  { arg }: { arg: { editedComment: any } }
) {
  const res = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.editedComment),
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useEditComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments',
    editComment /* options */
  )
  return {
    triggerEditComment: trigger,
    editCommentError: error,
  }
}

// DELETE Comment
async function deleteComment(url: string, { arg }: { arg: { body: any } }) {
  const res = await fetch(url, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.body),
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useDeleteComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments',
    deleteComment /* options */
  )
  return {
    triggerDeleteComment: trigger,
    deleteCommentError: error,
  }
}

// LIKE Comment
async function likeComment(url: string, { arg }: { arg: { commentId: any } }) {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.commentId),
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useLikeComment() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments/like',
    editComment /* options */
  )
  return {
    triggerLikeComment: trigger,
    likeCommentError: error,
  }
}
