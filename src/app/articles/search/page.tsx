'use client'

import page from '../page.module.css'
import Article from '@/components/Article'
import ArticleSkeleton from '@/components/skeleton-loading/Article'
import { useState } from 'react'
import useSWR from 'swr'
import { IArticle } from '../../../../types'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

function useArticles(searchText: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles/search?category=text&body=${searchText}&page=${page}&limit=${4}`,
    fetcher
  )
  return { data, isLoading, isError: error }
}

function FetchArticles({
  searchText,
  page,
}: {
  searchText: string
  page: number
}) {
  const { data, isLoading, isError } = useArticles(searchText, page)
  if (isLoading) {
    return (
      <>
        <ArticleSkeleton />
        <ArticleSkeleton />
        <ArticleSkeleton />
        <ArticleSkeleton />
      </>
    )
  }
  if (isError) return <h1>error...</h1>
  return data.map((article: IArticle, i: number) => (
    <Article article={article} key={i} />
  ))
}

export default function SearchedArticles({
  searchParams,
}: {
  searchParams: { searchText: string }
}) {
  console.log({ searchParams })
  const [count, setCount] = useState(1)

  let list: any = []
  for (let i = 0; i < count; i++) {
    list.push(
      <FetchArticles searchText={searchParams.searchText} page={i + 1} />
    )
  }

  return (
    <section className={page.section}>
      <div className={page.container}>
        <main className={page.main}>{list}</main>
        <div className={page.ads}></div>
      </div>
      <button
        onClick={() => setCount(count + 1)}
        className={page.btn_load_more}
      >
        Load More
      </button>
    </section>
  )
}
