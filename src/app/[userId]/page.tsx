import { FC } from 'react'
import Link from 'next/link'
import page from './page.module.css'
import {
  RiMapPinUserLine,
  RiLink,
  RiCake2Line,
  RiEyeLine,
  RiFileList3Line,
} from 'react-icons/ri'

interface PageProps {
  params: { userId: string }
}

const Profile: FC<PageProps> = ({ params }) => {
  console.log(params.userId.replace('%40', ''))

  return (
    <section className={page.section}>
      <div className={page.container}>
        <main className={page.main}>
          <img src='/images/featured/featured-1.jpg' alt='' />
          <div className={page.user_data}>
            <div className={page.user_name}>
              <h1>Anshul Anand (@{params.userId.replace('%40', '')})</h1>
            </div>
            <div className={page.user_bio}>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                assumenda maiores, officia reiciendis dolor blanditiis aliquam
                harum corrupti dolorem, animi excepturi vel quisquam totam in
                recusandae a cum suscipit. Quo!
              </p>
            </div>
            <div className={page.user_info}>
              <div>
                <RiCake2Line className='icon' /> 23/08/2023
              </div>
              <div>
                <RiMapPinUserLine className='icon' /> New Delhi
              </div>
              <div>
                <RiEyeLine className='icon' /> 23M content views
              </div>
              <div>
                <RiFileList3Line className='icon' /> 176 articles
              </div>
            </div>
            <div className={page.user_link}>
              <RiLink className='icon' />
              <a href='https://www.instagram.com/anshulanand02' target='_blank'>
                instagram.com/anshulanand02
              </a>
            </div>
            <div>
              <Link className={page.profile_edit} href='/edit-profile'>
                Edit Profile
              </Link>
            </div>
          </div>
        </main>
        <div className={page.user_articles}>
          <Link
            href='/articles/63e1f17ab55c299f3e972086'
            className={page.article}
          >
            <img
              src='/images/featured/featured-1.jpg'
              alt=''
              className='article-image'
            />
            <span className='article-category'>onepiece</span>
            <div
              className='article-data-container'
              id={page.article_data_container}
            >
              <div className='article-data'>
                <span>May 5th 2023</span>
                <span
                  className='article-data-spacer'
                  id={page.article_data_spacer}
                ></span>
                <span>8 Min read</span>
              </div>
              <h3 className='title article-title' id={page.article_title}>
                Sample Article Title
              </h3>
            </div>
          </Link>
          <Link
            href='/articles/63e1f17ab55c299f3e972086'
            className={page.article}
          >
            <img
              src='/images/featured/featured-1.jpg'
              alt=''
              className='article-image'
            />
            <span className='article-category'>onepiece</span>
            <div
              className='article-data-container'
              id={page.article_data_container}
            >
              <div className='article-data'>
                <span>May 5th 2023</span>
                <span
                  className='article-data-spacer'
                  id={page.article_data_spacer}
                ></span>
                <span>8 Min read</span>
              </div>
              <h3 className='title article-title' id={page.article_title}>
                Sample Article Title
              </h3>
            </div>
          </Link>
          <Link
            href='/articles/63e1f17ab55c299f3e972086'
            className={page.article}
          >
            <img
              src='/images/featured/featured-1.jpg'
              alt=''
              className='article-image'
            />
            <span className='article-category'>onepiece</span>
            <div
              className='article-data-container'
              id={page.article_data_container}
            >
              <div className='article-data'>
                <span>May 5th 2023</span>
                <span
                  className='article-data-spacer'
                  id={page.article_data_spacer}
                ></span>
                <span>8 Min read</span>
              </div>
              <h3 className='title article-title' id={page.article_title}>
                Sample Article Title
              </h3>
            </div>
          </Link>
          <Link
            href='/articles/63e1f17ab55c299f3e972086'
            className={page.article}
          >
            <img
              src='/images/featured/featured-1.jpg'
              alt=''
              className='article-image'
            />
            <span className='article-category'>onepiece</span>
            <div
              className='article-data-container'
              id={page.article_data_container}
            >
              <div className='article-data'>
                <span>May 5th 2023</span>
                <span
                  className='article-data-spacer'
                  id={page.article_data_spacer}
                ></span>
                <span>8 Min read</span>
              </div>
              <h3 className='title article-title' id={page.article_title}>
                Sample Article Title
              </h3>
            </div>
          </Link>
          <Link
            href='/articles/63e1f17ab55c299f3e972086'
            className={page.article}
          >
            <img
              src='/images/featured/featured-1.jpg'
              alt=''
              className='article-image'
            />
            <span className='article-category'>onepiece</span>
            <div
              className='article-data-container'
              id={page.article_data_container}
            >
              <div className='article-data'>
                <span>May 5th 2023</span>
                <span
                  className='article-data-spacer'
                  id={page.article_data_spacer}
                ></span>
                <span>8 Min read</span>
              </div>
              <h3 className='title article-title' id={page.article_title}>
                Sample Article Title
              </h3>
            </div>
          </Link>
          <Link
            href='/articles/63e1f17ab55c299f3e972086'
            className={page.article}
          >
            <img
              src='/images/featured/featured-1.jpg'
              alt=''
              className='article-image'
            />
            <span className='article-category'>onepiece</span>
            <div
              className='article-data-container'
              id={page.article_data_container}
            >
              <div className='article-data'>
                <span>May 5th 2023</span>
                <span
                  className='article-data-spacer'
                  id={page.article_data_spacer}
                ></span>
                <span>8 Min read</span>
              </div>
              <h3 className='title article-title' id={page.article_title}>
                Sample Article Title
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Profile
