'use client'

import Link from 'next/link'
import page from '@/app/articles/[article]/page.module.css'
import { useUserById } from '@/lib/user'
import { useUserArticles } from '@/lib/article'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import { IArticle } from '@/types'

export default function UserArticles({ article }: { article: IArticle }) {
  const { user } = useUserById(article.user)

  const { userArticles, isLoading, isError } = useUserArticles(
    article.user,
    1,
    4
  )

  if (!user || !userArticles || isLoading || isError) return null

  return (
    <div className={page.user_articles}>
      <div className={page.user_articles_profile}>
        <h3>
          Latest articles by
          <Link href={`/@${user.username}`} className={page.user_link}>
            {user.name}
          </Link>
        </h3>
      </div>
      <div className={page.articles}>
        {userArticles &&
          userArticles.map(article => (
            <Link
              key={article._id}
              href={`/articles/${article.url}`}
              className='article featured-article featured-article-1'
            >
              <img src={article.image} alt='' className='article-image' />
              <span className='article-category'>{article.tags[0]}</span>
              <div className='article-data-container'>
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
    </div>
  )
}
