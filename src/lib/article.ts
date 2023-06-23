'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { GET, POST } from '@/utils/fetch'
import { IArticle } from '@/types'

// GET articles
export function useArticles(page: number) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/articles?page=${page}&limit=${4}`,
    GET
  )
  return {
    data: data as Array<IArticle>,
    isLoading,
    isError: error,
  }
}

// GET User Articles
export function useUserArticles(userId: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/articles/user/${userId}?page=${page}&limit=${4}`,
    GET
  )
  return {
    userArticles: data as Array<IArticle>,
    isLoading,
    isError: error,
  }
}

// POST Article
export function usePostArticle() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/articles`,
    POST /* options */
  )
  return {
    triggerPostArticle: trigger,
    postArticleError: error,
    isPostArticleMutating: isMutating,
  }
}

// LIKE Article
export function useLikeArticle() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/like`,
    POST /* options */
  )
  return {
    triggerLikeArticle: trigger,
    likeArticleError: error,
    isLikeArticleMutating: isMutating,
  }
}

//  SEARCH Article
export function useSearchArticle(searchText: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/articles/search?category=text&body=${searchText}&page=${page}&limit=${4}`,
    GET
  )

  return {
    data: data as Array<IArticle>,
    isLoading,
    isError: error,
  }
}

//  GET Articles by tag
export function useTagArticle(tag: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/articles/search?category=tags&body=${tag}&page=${page}&limit=${4}`,
    GET
  )

  return {
    data: data as Array<IArticle>,
    isLoading,
    isError: error,
  }
}

// SUBSCRIBE newsletter
export function useSubscribe() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/newsletter`,
    POST /* options */
  )
  return {
    triggerSubscribe: trigger,
    subscribeError: error,
    isSubscribeMutating: isMutating,
  }
}

// CHECK whether user has already liked
export function useCheckArticleLike(articleId: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/check-like/${articleId}`,
    GET
  )

  return {
    data,
    isLoading,
    isError: error,
  }
}
