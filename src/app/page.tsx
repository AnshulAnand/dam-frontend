import Link from 'next/link'
import { RiArrowRightSLine } from 'react-icons/ri'
import Tag from '@/components/Tag'
import Newsletter from '@/components/Newsletter'
import HomeArticles from '@/components/HomeArticles'
import Sidebar from '@/components/Sidebar'
import OfficialPosts from '@/components/OfficialPosts'

export default function Home() {
  const tags = [
    'marvel',
    'dc',
    'dragonball',
    'onepunchman',
    'naruto',
    'onepiece',
  ]

  return (
    <>
      {/* <!-- Featured articles --> */}
      <section className='featured-articles section section-header-offset'>
        <div className='featured-articles-container container d-grid'>
          <div className='featured-content d-grid'>
            <div className='headline-banner'>
              <h3 className='headline fancy-border'>
                <span className='place-items-center'>Artciles</span>
              </h3>
              <span className='headline-description'>
                Articles written by fans, for fans.
              </span>
            </div>
            <HomeArticles />
          </div>
          <Sidebar />
        </div>

        <div className='see-more-container'>
          <Link
            href='/articles'
            className='btn see-more-btn place-items-center'
          >
            See more <RiArrowRightSLine className='icon' />
          </Link>
        </div>
      </section>

      {/* <!-- Official posts --> */}
      <section className='older-posts section'>
        <div className='container'>
          <h2 className='title section-title' data-name='Official posts'>
            Official posts
          </h2>
          <div className='older-posts-grid-wrapper d-grid'>
            <OfficialPosts />
          </div>
          <div className='see-more-container'>
            <Link
              href='/official-posts'
              className='btn see-more-btn place-items-center'
            >
              See more <RiArrowRightSLine className='icon' />
            </Link>
          </div>
        </div>
      </section>

      {/* <!-- Popular tags --> */}
      <section className='popular-tags section'>
        <div className='container'>
          <h2 className='title section-title' data-name='Popular tags'>
            Popular tags
          </h2>
          <div className='popular-tags-container d-grid'>
            {tags.length > 0 && tags.map(tag => <Tag tag={tag} key={tag} />)}
          </div>
        </div>
        <div className='see-more-container'>
          <Link href='/tags' className='btn see-more-btn place-items-center'>
            See more <RiArrowRightSLine className='icon' />
          </Link>
        </div>
      </section>

      {/* <!-- Newsletter --> */}
      <section className='newsletter section'>
        <div className='container'>
          <h2 className='title section-title' data-name='Newsletter'>
            Newsletter
          </h2>
          <Newsletter />
        </div>
      </section>
    </>
  )
}
