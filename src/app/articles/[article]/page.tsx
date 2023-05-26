import Link from 'next/link'
import page from './page.module.css'
import Profile from '@/components/Profile'
import CommentSection from '@/components/CommentSection'
import UserArticles from '@/components/UserArticles'
import { RiEyeLine } from 'react-icons/ri'

async function getArticle() {
  const res = await fetch(
    'http://localhost:5000/articles/naruto-vs-luffy-60052'
  )
  return res.json()
}

const article = async () => {
  const article = await getArticle()

  return (
    <>
      <section className={`container ${page.section}`}>
        <main className={page.main}>
          {/* Article */}
          <article className={page.article}>
            <h1 className={page.article_title}>{article.title}e</h1>
            <div className={page.article_tags}>
              <Link href={'/tags/onepiece'}>#onepiece</Link>
              <Link href={'/tags/naruto'}>#naruto</Link>
              <Link href={'/tags/vsbattles'}>#vsbattles</Link>
            </div>
            <div className={page.article_data}>
              <Profile width={50} height={50} forArticle={true} />
              <div className={page.article_info}>
                <span>May 5th 2023</span>
                <span className={page.spacer}></span>
                <span>8 Min read</span>
              </div>
            </div>
            <div className={page.article_image}>
              <img src='/images/featured/featured-2.jpg' alt='image' />
            </div>
            <p>{article.body}</p>
            <div className={page.article_views}>
              <RiEyeLine /> <p>193k views</p>
            </div>
          </article>

          {/* Mobile advertisement */}
          <div className={page.mobile_ad}>Mobile Advertisement</div>

          {/* User Articles */}
          <UserArticles />

          {/* Comments */}
          <CommentSection />
        </main>

        {/* Desktop advertisement */}
        <div className={page.desktop_ad}>Advertisement</div>
      </section>
    </>
  )
}

export default article
