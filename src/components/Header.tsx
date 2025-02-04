'use client'

import {
  RiSunLine,
  RiMoonLine,
  RiSearchLine,
  RiMenu3Line,
  RiCloseLine,
} from 'react-icons/ri'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchBox from './Search'
import useCurrentUser from '@/lib/user'
import React, { useState, useEffect } from 'react'
import { GET } from '@/utils/fetch'

export default function Header() {
  const pathname = usePathname()

  const { currentUser, isLoading, isError } = useCurrentUser()

  const [searchOpen, setSearchOpen] = useState(false)
  const [sunIconDisplay, setSunIconDisplay] = useState('d-block')
  const [moonIconDisplay, setMoonIconDisplay] = useState('d-none')
  const [toggle, setToggle] = useState(false)

  const handleThemeClick = () => {
    const theme = localStorage.getItem('damLightTheme')
    if (!theme) {
      localStorage.setItem('damLightTheme', 'active')
      document.body.classList.add('light-theme')
      setMoonIconDisplay('d-block')
      setSunIconDisplay('d-none')
    } else {
      localStorage.removeItem('damLightTheme')
      document.body.classList.remove('light-theme')
      setMoonIconDisplay('d-none')
      setSunIconDisplay('d-block')
    }
  }

  const handleLogout = async () => {
    const res = await GET(`http://localhost:5000/users/logout`)
    console.log({ res: await res.json() })
    location.assign(window.location.origin)
  }

  useEffect(() => {
    const onESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keyup', onESC, false)
    return () => window.addEventListener('keyup', onESC, false)
  }, [])

  return (
    <>
      <header className={`header ${toggle ? 'activated' : ''}`}>
        <nav className='navbar container'>
          <Link href='/'>
            <h2 className='logo'>DAM</h2>
          </Link>

          <div className={`menu ${toggle ? 'activated' : ''}`}>
            <ul className='list'>
              <li className='list-item'>
                <Link
                  href='/'
                  className={`list-link ${pathname === '/' ? 'current' : null}`}
                  onClick={() => setToggle(false)}
                >
                  Home
                </Link>
              </li>
              <li className='list-item'>
                <Link
                  href='/articles'
                  className={`list-link ${
                    pathname === '/articles' ? 'current' : null
                  }`}
                  onClick={() => setToggle(false)}
                >
                  Articles
                </Link>
              </li>
              <li className='list-item'>
                <Link
                  href='/official-posts'
                  className={`list-link ${
                    pathname === '/official-posts' ? 'current' : null
                  }`}
                  onClick={() => setToggle(false)}
                >
                  Official Posts
                </Link>
              </li>
              <li className='list-item'>
                <Link
                  href='/tags'
                  className={`list-link ${
                    pathname === '/tags' ? 'current' : null
                  }`}
                  onClick={() => setToggle(false)}
                >
                  Tags
                </Link>
              </li>
              <li className='list-item'>
                <Link
                  href='/new'
                  className={`list-link ${
                    pathname === '/new' ? 'current' : null
                  }`}
                  onClick={() => setToggle(false)}
                >
                  Write
                </Link>
              </li>
              <li className='list-item'>
                <Link
                  href='/about'
                  className={`list-link ${
                    pathname === '/about' ? 'current' : null
                  }`}
                  onClick={() => setToggle(false)}
                >
                  About
                </Link>
              </li>
              <li className='list-item'>
                <Link
                  href='/contact'
                  className={`list-link ${
                    pathname === '/contact' ? 'current' : null
                  }`}
                  onClick={() => setToggle(false)}
                >
                  Contact
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li className='list-item screen-lg-hidden'>
                    <button
                      style={{ cursor: 'pointer' }}
                      className='list-link'
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                  <li className='list-item screen-lg-hidden'>
                    <Link
                      href={`/@${currentUser.username}`}
                      className='list-link'
                      onClick={() => setToggle(false)}
                    >
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='list-item screen-lg-hidden'>
                    <Link
                      href='/sign-in'
                      className='list-link'
                      onClick={() => setToggle(false)}
                    >
                      Sign in
                    </Link>
                  </li>
                  <li className='list-item screen-lg-hidden'>
                    <Link
                      href='/sign-up'
                      className='list-link'
                      onClick={() => setToggle(false)}
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className='list list-right'>
            <button
              onClick={handleThemeClick}
              className='btn place-items-center'
            >
              <RiSunLine className={`icon ${sunIconDisplay}`} />
              <RiMoonLine className={`icon ${moonIconDisplay}`} />
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className='btn place-items-center'
            >
              <RiSearchLine className='icon' />
            </button>

            <button
              onClick={() => setToggle(!toggle)}
              className={`btn place-items-center screen-lg-hidden menu-toggle-icon ${
                toggle ? 'activated' : ''
              }`}
            >
              <RiMenu3Line className='icon open-menu-icon' />
              <RiCloseLine className='icon close-menu-icon' />
            </button>

            {currentUser ? (
              <>
                <button
                  style={{ cursor: 'pointer' }}
                  onClick={handleLogout}
                  className='list-link screen-sm-hidden'
                >
                  Logout
                </button>
                <Link
                  href={`/@${currentUser.username}`}
                  className='btn sign-up-btn fancy-border screen-sm-hidden'
                  onClick={() => setToggle(false)}
                >
                  <span>Profile</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/sign-in'
                  className='list-link screen-sm-hidden'
                  onClick={() => setToggle(false)}
                >
                  Sign in
                </Link>
                <Link
                  href='/sign-up'
                  className='btn sign-up-btn fancy-border screen-sm-hidden'
                  onClick={() => setToggle(false)}
                >
                  <span>Sign up</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Search Box */}
      <SearchBox searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
    </>
  )
}
