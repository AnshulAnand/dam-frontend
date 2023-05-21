import { RiArrowRightSLine, RiMailSendLine } from 'react-icons/ri'
import Link from 'next/link'
import Tag from '@/components/Tag'

export default function Home() {
  const tags = ['bleach', 'db', 'jojo', 'naruto', 'onepiece', 'opm']

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
            <Link
              href='/articles/63e1f17ab55c299f3e972086'
              className='article featured-article featured-article-1'
            >
              <img
                src='/images/featured/featured-1.jpg'
                alt=''
                className='article-image'
              />
              <span className='article-category'>onepiece</span>
              <div className='article-data-container'>
                <div className='article-data'>
                  <span>May 5th 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>8 Min read</span>
                </div>
                <h3 className='title article-title'>Sample Article Title</h3>
              </div>
            </Link>
            <Link
              href='/articles/63e1f17ab55c299f3e972086'
              className='article featured-article featured-article-2'
            >
              <img
                src='/images/featured/featured-2.jpg'
                alt=''
                className='article-image'
              />
              <span className='article-category'>dragonball</span>
              <div className='article-data-container'>
                <div className='article-data'>
                  <span>May 5th 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>4 Min read</span>
                </div>
                <h3 className='title article-title'>Sample article title</h3>
              </div>
            </Link>
            <Link
              href='/articles/63e1f17ab55c299f3e972086'
              className='article featured-article featured-article-3'
            >
              <img
                src='/images/featured/featured-3.jpg'
                alt=''
                className='article-image'
              />
              <span className='article-category'>jojo</span>
              <div className='article-data-container'>
                <div className='article-data'>
                  <span>May 5th 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>5 Min read</span>
                </div>
                <h3 className='title article-title'>Sample article title</h3>
              </div>
            </Link>
          </div>

          {/* Side bar */}
          <div className='sidebar'>
            <h3 className='title featured-content-title'>Advertisement</h3>
          </div>
        </div>
        <div className='see-more-container'>
          <Link href='/articles' className='btn see-more-btn place-items-center'>
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
            <Link href='#' className='article d-grid'>
              <div className='older-posts-article-image-wrapper'>
                <img
                  src='/images/older_posts/older_posts_1.jpg'
                  alt=''
                  className='article-image'
                />
              </div>

              <div className='article-data-container'>
                <div className='article-data'>
                  <span>5 May 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>3 Min read</span>
                </div>

                <h3 className='title article-title'>Sample article title</h3>
                <p className='article-description'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Similique a tempore sapiente corporis, eaque fuga placeat odit
                  voluptatibus.
                </p>
              </div>
            </Link>

            <Link href='#' className='article d-grid'>
              <div className='older-posts-article-image-wrapper'>
                <img
                  src='/images/older_posts/older_posts_2.jpg'
                  alt=''
                  className='article-image'
                />
              </div>

              <div className='article-data-container'>
                <div className='article-data'>
                  <span>5 May 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>3 Min read</span>
                </div>

                <h3 className='title article-title'>Sample article title</h3>
                <p className='article-description'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Similique a tempore sapiente corporis, eaque fuga placeat odit
                  voluptatibus.
                </p>
              </div>
            </Link>

            <Link href='#' className='article d-grid'>
              <div className='older-posts-article-image-wrapper'>
                <img
                  src='/images/older_posts/older_posts_3.jpg'
                  alt=''
                  className='article-image'
                />
              </div>

              <div className='article-data-container'>
                <div className='article-data'>
                  <span>5 May 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>3 Min read</span>
                </div>

                <h3 className='title article-title'>Sample article title</h3>
                <p className='article-description'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Similique a tempore sapiente corporis, eaque fuga placeat odit
                  voluptatibus.
                </p>
              </div>
            </Link>

            <Link href='#' className='article d-grid'>
              <div className='older-posts-article-image-wrapper'>
                <img
                  src='/images/older_posts/older_posts_4.jpg'
                  alt=''
                  className='article-image'
                />
              </div>

              <div className='article-data-container'>
                <div className='article-data'>
                  <span>5 May 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>3 Min read</span>
                </div>

                <h3 className='title article-title'>Sample article title</h3>
                <p className='article-description'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Similique a tempore sapiente corporis, eaque fuga placeat odit
                  voluptatibus.
                </p>
              </div>
            </Link>

            <Link href='#' className='article d-grid'>
              <div className='older-posts-article-image-wrapper'>
                <img
                  src='/images/older_posts/older_posts_5.jpg'
                  alt=''
                  className='article-image'
                />
              </div>

              <div className='article-data-container'>
                <div className='article-data'>
                  <span>5 May 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>3 Min read</span>
                </div>

                <h3 className='title article-title'>Sample article title</h3>
                <p className='article-description'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Similique a tempore sapiente corporis, eaque fuga placeat odit
                  voluptatibus.
                </p>
              </div>
            </Link>

            <Link href='#' className='article d-grid'>
              <div className='older-posts-article-image-wrapper'>
                <img
                  src='/images/older_posts/older_posts_6.jpg'
                  alt=''
                  className='article-image'
                />
              </div>

              <div className='article-data-container'>
                <div className='article-data'>
                  <span>5 May 2023</span>
                  <span className='article-data-spacer'></span>
                  <span>3 Min read</span>
                </div>

                <h3 className='title article-title'>Sample article title</h3>
                <p className='article-description'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Similique a tempore sapiente corporis, eaque fuga placeat odit
                  voluptatibus.
                </p>
              </div>
            </Link>
          </div>
          <div className='see-more-container'>
            <Link href='/official-posts' className='btn see-more-btn place-items-center'>
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

          <div className='form-container-inner'>
            <h6 className='title newsletter-title'>
              Subscribe to DAM Newsletter
            </h6>
            <p className='newsletter-description'>
              Get handpicked artciles, written by the community, every weekend
              in an e-mail
            </p>

            <form action='' className='form'>
              <input
                className='form-input'
                type='text'
                placeholder='Enter your email address'
              />
              <button className='btn form-btn' type='submit'>
                <RiMailSendLine className='icon' />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
