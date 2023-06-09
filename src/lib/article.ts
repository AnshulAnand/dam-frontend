'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

// GET User Articles
async function fetchUserArticles(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export function useUserArticles(page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles?page=${page}&limit=${4}`,
    fetchUserArticles
  )
  return { userArticles: data, isLoading, isError: error }
}

// LIKE Article
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

//  SEARCH Article
async function searchArticle(url: string, { arg }: { arg: { body: any } }) {
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

export function useSearchArticle(searchText: string, page: number) {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `http://localhost:5000/articles/search?category=text&body=${searchText}&page=${page}&limit=${4}`,
    searchArticle /* options */
  )
  return {
    triggerSearchArticle: trigger,
    searchArticleError: error,
  }
}
