'use client'

import UserArticleSkeleton from './skeleton-loading/UserProfileArticle'
import page from '@/app/[userId]/page.module.css'
import { useUserArticles } from '@/lib/article'
import { Dispatch, SetStateAction, useState } from 'react'
import Link from 'next/link'

function FetchArticles({
  userId,
  pageNumber,
  setNext,
}: {
  pageNumber: number
  userId: string
  setNext: Dispatch<SetStateAction<boolean>>
}): any {
  const { userArticles, isLoading, isError } = useUserArticles(
    userId,
    pageNumber,
    4
  )

  if (isLoading)
    return (
      <>
        <UserArticleSkeleton />
        <UserArticleSkeleton />
        <UserArticleSkeleton />
      </>
    )
  if (isError) return <h1>error...</h1>
  if (userArticles.length < 4) setNext(false)
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

export default function UserProfileArticles({ visitor }: { visitor: any }) {
  const [next, setNext] = useState(true)
  const [count, setCount] = useState(1)

  let list: any = []
  for (let i = 0; i < count; i++) {
    list.push(
      <FetchArticles
        userId={visitor._id}
        pageNumber={i + 1}
        setNext={setNext}
      />
    )
  }

  return (
    <>
      {list}
      {next ? (
        <button
          onClick={() => setCount(count + 1)}
          className={page.btn_load_more}
        >
          Load More
        </button>
      ) : null}
    </>
  )
}
