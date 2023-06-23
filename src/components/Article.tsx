import Link from 'next/link'
import page from '@/app/articles/page.module.css'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import { IArticle } from '@/types'

export default function Article({ article }: { article: IArticle }) {
  return (
    <Link href={`/articles/${article.url}`} className={page.article}>
      <img src={`${article.image}`} alt='' className='article-image' />
      <span className='article-category'>{article.tags[0]}</span>
      <div className='article-data-container' id={page.article_data_container}>
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
  )
}
