'use client'
import UserArticleSkeleton from './skeleton-loading/UserProfileArticle'
import page from '@/app/[userId]/page.module.css'
import { useUserArticles } from '@/lib/article'
import { useState } from 'react'
import Link from 'next/link'

function FetchArticles({ pageNumber }: { pageNumber: number }) {
  const { userArticles, isLoading, isError } = useUserArticles(pageNumber)
  if (isLoading)
    return (
      <>
        <UserArticleSkeleton />
        <UserArticleSkeleton />
        <UserArticleSkeleton />
      </>
    )
  if (isError) return <h1>error...</h1>
  return userArticles.map((article: any, i: number) => (
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

export default function UserProfileArticles() {
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
