'use client'

import page from '../page.module.css'
import Article from '@/components/Article'
import ArticleSkeleton from '@/components/skeleton-loading/Article'
import { useState } from 'react'
import { IArticle } from '../../../../types'
import { useSearchArticle } from '@/lib/article'

function FetchArticles({
  searchText,
  page,
}: {
  searchText: string
  page: number
}) {
  const { data, isLoading, isError } = useSearchArticle(searchText, page)
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
