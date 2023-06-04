'use client'

import useSWR from 'swr'

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
export async function postComment(
  url: string,
  { arg }: { arg: { comment: any } }
) {
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
