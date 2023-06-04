'use client'

import page from './page.module.css'
import Article from '@/components/Article'
import { useState } from 'react'
import useSWR from 'swr'

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

function useArticles(tag: string, page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles/search?category=tags&body=${tag}&page=${page}&limit=${4}`,
    fetcher
  )
  return { data, isLoading, isError: error }
}

function FetchArticles({ page, tag }: { tag: string; page: number }) {
  const { data, isLoading, isError } = useArticles(tag, page)
  if (isLoading) return <h1>loading...</h1>
  if (isError) return <h1>{isError.info.message}</h1>
  return data.map((article: any, i: number) => (
    <Article article={article} key={i} />
  ))
}

const Articles = ({ params }: { params: { tag: string } }) => {
  const [count, setCount] = useState(1)

  let list: any = []
  for (let i = 0; i < count; i++) {
    list.push(<FetchArticles tag={params.tag} page={i + 1} />)
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

export default Articles
