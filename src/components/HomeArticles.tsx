'use client'

import Link from 'next/link'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import { useArticles } from '@/lib/article'
import HomeArticlesSkeleton from './skeleton-loading/HomeArticles'

export default function HomeArticles() {
  const { data, isError, isLoading } = useArticles(8)

  if (isLoading) return <HomeArticlesSkeleton />

  if (!data || isError) {
    console.log({ isError })
    throw new Error('Failed to fetch articles')
  }

  return (
    <>
      <Link
        href={`/articles/${data[0].url}`}
        className='article featured-article featured-article-1'
      >
        <img src={data[0].image} alt='' className='article-image' />
        <span className='article-category'>{data[0].tags[0]}</span>
        <div className='article-data-container'>
          <div className='article-data'>
            <span>{returnDate(data[0])}</span>
            <span className='article-data-spacer'></span>
            <span>{readingTime(data[0])} Min read</span>
          </div>
          <h3 className='title article-title'>{data[0].title}</h3>
        </div>
      </Link>
      <Link
        href={`/articles/${data[1].url}`}
        className='article featured-article featured-article-2'
      >
        <img src={data[1].image} alt='' className='article-image' />
        <span className='article-category'>{data[1].tags[0]}</span>
        <div className='article-data-container'>
          <div className='article-data'>
            <span>{returnDate(data[1])}</span>
            <span className='article-data-spacer'></span>
            <span>{readingTime(data[1])} Min read</span>
          </div>
          <h3 className='title article-title'>{data[1].title}</h3>
        </div>
      </Link>
      <Link
        href={`/articles/${data[2].url}`}
        className='article featured-article featured-article-3'
      >
        <img src={data[2].image} alt='' className='article-image' />
        <span className='article-category'>{data[2].tags[0]}</span>
        <div className='article-data-container'>
          <div className='article-data'>
            <span>{returnDate(data[2])}</span>
            <span className='article-data-spacer'></span>
            <span>{readingTime(data[2])} Min read</span>
          </div>
          <h3 className='title article-title'>{data[2].title}</h3>
        </div>
      </Link>

      {/* Side bar */}
      <div className='sidebar d-grid'>
        <h3 className='title featured-content-title'>Trending Articles</h3>
        {data &&
          data.slice(3, 8).map((article, i) => (
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
                  <span>{readingTime(article)}</span>
                </div>

                <h3 className='title article-title'>{article.title}</h3>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}
