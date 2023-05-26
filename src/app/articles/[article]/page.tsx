import Link from 'next/link'
import page from './page.module.css'
import Profile from '@/components/Profile'
import CommentSection from '@/components/CommentSection'
import UserArticles from '@/components/UserArticles'

const article = () => {
  return (
    <>
      <section className={`container ${page.section}`}>
        <main className={page.main}>
          {/* Article */}
          <article className={page.article}>
            <h1 className={page.article_title}>Sample article title</h1>
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
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
              eius possimus hic eligendi distinctio rerum incidunt, esse quasi
              eum molestiae ducimus ipsam quae, aliquid ullam placeat dolorum
              nulla vero. Quam? Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Sapiente repellat consequatur culpa, repudiandae
              aut dolores iusto. Rem natus soluta, dolores, ad deleniti, aut
              dolorem corrupti quasi amet unde delectus hic?
            </p>
            <br />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
              eius possimus hic eligendi distinctio rerum incidunt, esse quasi
              eum molestiae ducimus ipsam quae, aliquid ullam placeat dolorum
              nulla vero. Quam? Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Vero quod necessitatibus, aspernatur pariatur
              asperiores earum quas adipisci veritatis quidem facilis! Nihil
              veniam quaerat nulla possimus, asperiores vero voluptatum placeat.
              Eveniet!
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              voluptates, laboriosam voluptatum quos non consequuntur nesciunt
              necessitatibus tempora quod inventore corporis rem nihil itaque,
              at provident minus aliquam veritatis. Labore?
            </p>
            <br />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
              eius possimus hic eligendi distinctio rerum incidunt, esse quasi
              eum molestiae ducimus ipsam quae, aliquid ullam placeat dolorum
              nulla vero. Quam? Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Vero quod necessitatibus, aspernatur pariatur
              asperiores earum quas adipisci veritatis quidem facilis! Nihil
              veniam quaerat nulla possimus, asperiores vero voluptatum placeat.
              Eveniet!
            </p>
            <p className={page.article_views}>193k views</p>
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
