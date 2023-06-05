'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

// GET Comments
async function getReplies(url: string) {
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useReplies(page: number, articleId: string, commentId: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/replies?page=${page}&limit=${4}&articleId=${articleId}&commentId=${commentId}`,
    getReplies
  )
  return { replies: data, isLoading, isError: error }
}

// POST Reply
async function postReply(url: string, { arg }: { arg: { reply: any } }) {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.reply),
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function usePostReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/replies',
    postReply /* options */
  )

  return {
    triggerPostReply: trigger,
    postReplyError: error,
  }
}

// EDIT Reply
async function editReply(url: string, { arg }: { arg: { editedReply: any } }) {
  const res = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.editedReply),
  })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useEditReply() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/replies',
    editReply /* options */
  )
  return {
    triggerEditReply: trigger,
    editReplyError: error,
  }
}
