'use client'

import page from './page.module.css'
import Article from '@/components/Article'
import { useArticles } from '@/lib/article'
import ArticleSkeleton from '@/components/skeleton-loading/Article'
import { Dispatch, SetStateAction, useState } from 'react'
import { IArticle } from '../../types'

function FetchArticles({
  page,
  setNext,
}: {
  page: number
  setNext: Dispatch<SetStateAction<boolean>>
}): any {
  const { data, isLoading, isError } = useArticles(page)
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
  console.log({ data })
  if (isError) return <h1>error...</h1>
  if (data.length < 4) setNext(false)
  return data.map((article: IArticle, i: number) => (
    <Article article={article} key={i} />
  ))
}

export default function Articles() {
  const [count, setCount] = useState(1)
  const [next, setNext] = useState(true)

  let list: Array<any> = []
  for (let i = 0; i < count; i++) {
    list.push(<FetchArticles page={i + 1} setNext={setNext} />)
  }

  return (
    <section className={page.section}>
      <div className={page.container}>
        <main className={page.main}>{list}</main>
        <div className={page.ads}></div>
      </div>
      {next ? (
        <button
          onClick={() => setCount(count + 1)}
          className={page.btn_load_more}
        >
          Load More
        </button>
      ) : null}
    </section>
  )
}
