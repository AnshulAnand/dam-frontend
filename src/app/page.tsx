import { RiArrowRightSLine } from 'react-icons/ri'
import Link from 'next/link'
import Tag from '@/components/Tag'
import Newsletter from '@/components/Newsletter'
import returnDate from '@/utils/returnDate'
import readingTime from '@/utils/readingTime'
import { GET } from '@/utils/fetch'

export default async function Home() {
  const articles = await GET(`http://localhost:5000/articles?page=1&limit=3`)

  const article1 = articles.results[0]
  const article2 = articles.results[1]
  const article3 = articles.results[2]

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
              href={`/articles/${article1.url}`}
              className='article featured-article featured-article-1'
            >
              <img src={article1.image} alt='' className='article-image' />
              <span className='article-category'>{article1.tags[0]}</span>
              <div className='article-data-container'>
                <div className='article-data'>
                  <span>{returnDate(article1)}</span>
                  <span className='article-data-spacer'></span>
                  <span>{readingTime(article1)} Min read</span>
                </div>
                <h3 className='title article-title'>{article1.title}</h3>
              </div>
            </Link>
            <Link
              href={`/articles/${article2.url}`}
              className='article featured-article featured-article-2'
            >
              <img src={article2.image} alt='' className='article-image' />
              <span className='article-category'>{article2.tags[0]}</span>
              <div className='article-data-container'>
                <div className='article-data'>
                  <span>{returnDate(article2)}</span>
                  <span className='article-data-spacer'></span>
                  <span>{readingTime(article2)} Min read</span>
                </div>
                <h3 className='title article-title'>{article2.title}</h3>
              </div>
            </Link>
            <Link
              href={`/articles/${article3.url}`}
              className='article featured-article featured-article-3'
            >
              <img src={article3.image} alt='' className='article-image' />
              <span className='article-category'>{article3.tags[0]}</span>
              <div className='article-data-container'>
                <div className='article-data'>
                  <span>{returnDate(article3)}</span>
                  <span className='article-data-spacer'></span>
                  <span>{readingTime(article3)} Min read</span>
                </div>
                <h3 className='title article-title'>{article3.title}</h3>
              </div>
            </Link>
          </div>

          {/* Side bar */}
          <div className='sidebar'>
            <h3 className='title featured-content-title'>Advertisement</h3>
          </div>
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
