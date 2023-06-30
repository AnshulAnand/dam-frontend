'use client'

import Link from 'next/link'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import { useArticles } from '@/lib/article'

export default function Sidebar() {
  const { data, isError, isLoading } = useArticles(2, 5)

  if (isLoading)
    return <div className='sidebar d-grid skeleton animate-pulse'></div>

  if (!data || isError) {
    throw new Error('Failed to fetch articles')
  }

  return (
    <div className='sidebar d-grid'>
      <h3 className='title featured-content-title'>Trending Articles</h3>
      {data &&
        data.map((article, i) => (
          <Link
            href={article.url}
            className='trending-news-box'
            key={article._id}
          >
            <div className='trending-news-img-box'>
              <span className='trending-number place-items-center'>
                0{i + 1}
              </span>
              <img src={article.image} alt='' className='article-image' />
            </div>

            <div className='trending-news-data'>
              <div className='article-data'>
                <span>{returnDate(article)}</span>
                <span className='article-data-spacer'></span>
                <span>{readingTime(article)} Min read</span>
              </div>

              <h3 className='title article-title'>{article.title}</h3>
            </div>
          </Link>
        ))}
    </div>
  )
}
