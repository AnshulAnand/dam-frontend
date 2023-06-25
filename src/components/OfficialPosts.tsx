'use client'

import Link from 'next/link'
import { useUserByUsername } from '@/lib/user'
import { useUserArticles } from '@/lib/article'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import OfficialPostsSkeleton from './skeleton-loading/OfficialPosts'

export default function OfficialPosts() {
  const { user } = useUserByUsername('dam')

  console.log({ user })

  const { userArticles, isError, isLoading } = useUserArticles(user._id, 6)

  if (isLoading) return <OfficialPostsSkeleton />

  if (!userArticles || isError) {
    console.log({ isError })
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
              <span>{readingTime(article)}</span>
            </div>
            <h3 className='title article-title'>{article.title}</h3>
            <p className='article-description'>{article.description}</p>
          </div>
        </Link>
      ))}
    </>
  )
}
