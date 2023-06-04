import Link from 'next/link'
import page from './page.module.css'
import Profile from '@/components/Profile'
import CommentSection from '@/components/CommentSection'
import UserArticles from '@/components/UserArticles'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import { RiEyeLine } from 'react-icons/ri'

async function getArticle(article: string) {
  const res = await fetch(`http://localhost:5000/articles/${article}`)
  return res.json()
}

const Article = async ({ params }: { params: { article: string } }) => {
  const article = await getArticle(params.article)
  console.log(article)

  return (
      <section className={`container ${page.section}`}>
        <main className={page.main}>
          {/* Article */}
          <article className={page.article}>
            <h1 className={page.article_title}>{article.title}</h1>
            <div className={page.article_tags}>
              {article.tags.map((tag: string, i: number) => (
                <Link key={i} href={`/tags/${tag}`}>
                  #{tag}
                </Link>
              ))}
            </div>
            <div className={page.article_data}>
              <Profile
                userId={article.user}
                width={50}
                height={50}
                forArticle={true}
              />
              <div className={page.article_info}>
                <span>{returnDate(article)}</span>
                <span className={page.spacer}></span>
                <span>{readingTime(article)} Min read</span>
              </div>
            </div>
            <div className={page.article_image}>
              <img src={article.image} alt='image' />
            </div>
            <div className={page.article_body} dangerouslySetInnerHTML={{__html: article.body}}/>
            <div className={page.article_views}>
              <RiEyeLine /> <p>{article.views} views</p>
            </div>
          </article>

          {/* Mobile advertisement */}
          <div className={page.mobile_ad}>Mobile Advertisement</div>

          {/* User Articles */}
          <UserArticles />

          {/* Comments */}
          <CommentSection articleId={article._id} />
        </main>

        {/* Desktop advertisement */}
        <div className={page.desktop_ad}>Advertisement</div>
      </section>
  )
}

export default Article
