'use client'

import { GET, POST } from '@/utils/fetch'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

// GET articles
export function useArticles(page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles?page=${page}&limit=${4}`,
    GET
  )
  return { data, isLoading, isError: error }
}

// GET User Articles
export function useUserArticles(userId: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles/user/${userId}?page=${page}&limit=${4}`,
    GET
  )
  return { userArticles: data, isLoading, isError: error }
}

// POST Article
export function usePostArticle() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/articles',
    POST /* options */
  )
  return {
    triggerPostArticle: trigger,
    postArticleError: error,
  }
}

// LIKE Article
export function useLikeArticle() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/articles/like',
    POST /* options */
  )
  return {
    triggerLikeArticle: trigger,
    likeArticleError: error,
  }
}

//  SEARCH Article
export function useSearchArticle(searchText: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles/search?category=text&body=${searchText}&page=${page}&limit=${4}`,
    GET
  )

  return {
    data,
    isLoading,
    isError: error,
  }
}

//  GET Articles by tag
export function useTagArticle(tag: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles/search?category=tags&body=${tag}&page=${page}&limit=${4}`,
    GET
  )

  return {
    data,
    isLoading,
    isError: error,
  }
}

// SUBSCRIBE newsletter
export function useSubscribe() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/newsletter',
    POST /* options */
  )
  return {
    triggerSubscribe: trigger,
    subscribeError: error,
  }
}
