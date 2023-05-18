import Link from 'next/link'
import page from './page.module.css'

const Articles = () => {
  return <section className={page.section}>
    <main className={page.main}>
      <Link href='/articles/63e1f17ab55c299f3e972086' className={page.article}>
        <img src='/images/featured/featured-1.jpg' alt='' className={page.article_image} />
        <span className={page.article_category}>onepiece</span>
        <div className={page.article_data_container}>
        <div className={page.article_data}>
          <span>May 5th 2023</span>
          <span className={page.article_data_spacer}></span>
          <span>8 Min read</span>
        </div>
        <h3 className='title article-title'>Sample Article Title</h3>
        </div>
      </Link>
    </main>
    {/*Ad*/}
    <div className={page.ads}></div>
  </section>
}

export default Articles