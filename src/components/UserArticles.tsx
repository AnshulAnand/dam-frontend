import Link from 'next/link'
import page from '@/app/articles/[article]/page.module.css'

const UserArticles = () => {
  return (
    <div className={page.user_articles}>
      <div className={page.user_articles_profile}>
        <h3>
          Latest articles by
          <Link href={'anshulanand02'} className={page.user_link}>
            anshulanand02
          </Link>
        </h3>
      </div>
      <div className={page.articles}>
        <Link href={'#'}>Sample article title</Link>
        <Link href={'#'}>Sample article title</Link>
        <Link href={'#'}>Sample article title</Link>
        <Link href={'#'}>Sample article title</Link>
        <Link href={'#'}>Sample article title</Link>
      </div>
    </div>
  )
}

export default UserArticles
