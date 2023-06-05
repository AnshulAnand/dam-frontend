'use client'

import useSWRMutation from 'swr/mutation'

// LIKE Comment
async function likeArticle(url: string, { arg }: { arg: { body: any } }) {
  const res = await fetch(url, {
    method: 'POST',
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

export function useLikeArticle() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/articles/like',
    likeArticle /* options */
  )
  return {
    triggerLikeArticle: trigger,
    likeArticleError: error,
  }
}
