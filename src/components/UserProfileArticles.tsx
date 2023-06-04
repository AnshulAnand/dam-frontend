'use client'
import page from '@/app/[userId]/page.module.css'
import { useState } from 'react'
import Link from 'next/link'
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

function useArticles(page: number) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/articles?page=${page}&limit=${4}`,
    fetcher
  )
  return { data, isLoading, isError: error }
}

function FetchArticles({ pageNumber }: { pageNumber: number }) {
  const { data, isLoading, isError } = useArticles(pageNumber)
  if (isLoading) return <h1>loading...</h1>
  if (isError) return <h1>error...</h1>
  return data.results.map((article: any, i: number) => (
    <Link key={i} href={`/articles/${article.url}`} className={page.article}>
      <img src={article.image} alt='' className='article-image' />
      <span className='article-category'>{article.tags[0]}</span>
      <div className='article-data-container'>
        <div className='article-data'>
          <span>May 5th 2023</span>
          <span className='article-data-spacer'></span>
          <span>8 Min read</span>
        </div>
        <h3 className='title article-title'>{article.title}</h3>
      </div>
    </Link>
  ))
}

function UserProfileArticles() {
  const [count, setCount] = useState(1)

  let list: any = []
  for (let i = 0; i < count; i++) {
    list.push(<FetchArticles pageNumber={i + 1} />)
  }

  return (
    <>
      <>{list}</>
      <button
        onClick={() => setCount(count + 1)}
        className={page.btn_load_more}
      >
        Load More
      </button>
    </>
  )
}

export default UserProfileArticles
