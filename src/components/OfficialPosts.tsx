'use client'

import Link from 'next/link'
import { useUserArticles } from '@/lib/article'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import OfficialPostsSkeleton from './skeleton-loading/OfficialPosts'

export default function OfficialPosts() {
  const { userArticles, isError, isLoading } = useUserArticles(
    process.env.NEXT_PUBLIC_OFFICIAL_ID as string,
    1,
    6
  )

  if (isLoading) return <OfficialPostsSkeleton />

  if (!userArticles || isError) {
    throw new Error('Failed to fetch data')
  }

  return (
    <>
      {userArticles.map(article => (
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
      ))}
    </>
  )
}
