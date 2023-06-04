'use client'

import useSWR from 'swr'

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
export async function postReply(url: string, { arg }: { arg: { reply: any } }) {
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
