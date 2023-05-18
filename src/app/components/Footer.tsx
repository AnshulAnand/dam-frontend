import {
  RiFacebookCircleLine,
  RiInstagramLine,
  RiPinterestLine,
  RiTwitterLine,
} from 'react-icons/ri'
import Link from 'next/link'

function Footer() {
  return (
    <footer className='footer section'>
      <div className='footer-container container d-grid'>
        <div className='company-data'>
          <Link href='/'>
            <h2 className='logo'>DAM</h2>
          </Link>
          <p className='company-description'>
            DAM is a platform where fans can write content about their favourite
            shows, movies, comics or games, for other fellow fans.
          </p>

          <ul className='list social-media'>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                <RiInstagramLine className='icon' />
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                <RiFacebookCircleLine className='icon' />
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                <RiTwitterLine className='icon' />
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                <RiPinterestLine className='icon' />
              </Link>
            </li>
          </ul>

          <span className='copyright-notice'>
            &copy;2023 DAM. All rights reserved.
          </span>
        </div>

        <div>
          <h6 className='title footer-title'>Categories</h6>

          <ul className='footer-list list'>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Anime
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Manga
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Marvel
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                DC Comics
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className='title footer-title'>Useful links</h6>

          <ul className='footer-list list'>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Home
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Articles
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Tags
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Write
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className='title footer-title'>Company</h6>

          <ul className='footer-list list'>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                About
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Contact
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                F.A.Q
              </Link>
            </li>
            <li className='list-item'>
              <Link href='#' className='list-link'>
                Careers
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
export default Footer
