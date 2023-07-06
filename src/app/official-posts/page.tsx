'use client'

import OfficialPostsSkeleton from '@/components/skeleton-loading/OfficialPosts'
import { useUserArticles } from '@/lib/article'
import { IArticle } from '@/types'
import readingTime from '@/utils/readingTime'
import returnDate from '@/utils/returnDate'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'

function FetchArticles({
  page,
  setNext,
}: {
  page: number
  setNext: Dispatch<SetStateAction<boolean>>
}): any {
  const { userArticles, isError, isLoading } = useUserArticles(
    process.env.NEXT_PUBLIC_OFFICIAL_ID as string,
    page,
    4
  )
  if (isLoading) return <OfficialPostsSkeleton />

  if (!userArticles || isError) {
    console.log({ isError })
    throw new Error('Failed to fetch data')
  }

  if (isError) return <h1>error...</h1>
  if (userArticles.length < page) setNext(false)

  return userArticles.map((article: IArticle) => (
    <Link href={article.url} className='article d-grid' key={article._id}>
      <div className='older-posts-article-image-wrapper'>
        <img src={article.image} alt='' className='article-image' />
      </div>
      <div className='article-data-container'>
        <div className='article-data'>
          <span>{returnDate(article)}</span>
          <span className='article-data-spacer'></span>
          <span>{readingTime(article)} Min read</span>
        </div>
        <h3 className='title article-title'>{article.title}</h3>
        <p className='article-description'>{article.description}</p>
      </div>
    </Link>
  ))
}

export default function Page() {
  const [count, setCount] = useState(1)
  const [next, setNext] = useState(true)

  let list: Array<any> = []
  for (let i = 0; i < count; i++) {
    list.push(<FetchArticles page={i + 1} setNext={setNext} />)
  }

  return (
    <section style={{ marginTop: '5rem' }} className='older-posts section'>
      <div className='container'>
        <h2 className='title section-title' data-name='Official posts'>
          Official posts
        </h2>
        <div className='older-posts-grid-wrapper d-grid'>{list}</div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {next ? (
          <button onClick={() => setCount(count + 1)} className='load-more-btn'>
            Load More
          </button>
        ) : null}
      </div>
    </section>
  )
}
