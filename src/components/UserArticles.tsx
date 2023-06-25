'use client'

import Link from 'next/link'
import page from '@/app/articles/[article]/page.module.css'
import { useUserById } from '@/lib/user'
import { useArticles } from '@/lib/article'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import { IArticle } from '@/types'

export default function UserArticles({ article }: { article: IArticle }) {
  const { user } = useUserById(article.user)

  console.log({ user })

  const { data, isLoading, isError } = useArticles(4)

  if (!data || isLoading || isError) return null

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
        {data &&
          data.map(article => (
            <Link
              className={page.article}
              style={{ width: '100%' }}
              href={`/articles/${article.url}`}
              key={article._id}
            >
              <img src={`${article.image}`} alt='' className='article-image' />
              <span className='article-category'>{article.tags[0]}</span>
              <div
                className='article-data-container'
                id={page.article_data_container}
              >
                <div className='article-data'>
                  <span>{returnDate(article)}</span>
                  <span
                    className='article-data-spacer'
                    id={page.article_data_spacer}
                  ></span>
                  <span>{readingTime(article)} Min read</span>
                </div>
                <h3 className='title article-title' id={page.article_title}>
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
