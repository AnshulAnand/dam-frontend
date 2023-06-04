'use client'

import {
  RiSunLine,
  RiMoonLine,
  RiSearchLine,
  RiMenu3Line,
  RiCloseLine,
} from 'react-icons/ri'
import Link from 'next/link'
import useCurrentUser from '@/lib/user'
import { useState, useEffect, useRef } from 'react'

function Header() {
  const { user, isLoading, isError } = useCurrentUser()
  if (isError) console.log({ isError })

  const [lightTheme, setLightTheme] = useState(false)
  useEffect(
    () => setLightTheme(localStorage.getItem('damLightTheme') === 'active'),
    []
  )
  const [sunIconDisplay, setSunIconDisplay] = useState('d-block')
  const [moonIconDisplay, setMoonIconDisplay] = useState('d-none')
  const searchInput = useRef<HTMLInputElement>(null)
  const [searchStatus, setSerachStatus] = useState(false)
  const [searchFormClass, setSearchFormClass] = useState(
    'search-form-container container'
  )
  const [toggle, setToggle] = useState(false)
  const [toggleHeaderClass, setToggleHeaderClass] = useState('header')
  const [toggleMenuClass, setToggleMenuClass] = useState(
    'btn place-items-center screen-lg-hidden menu-toggle-icon'
  )
  const [toggleMenuIconClass, setToggleMenuIconClass] = useState(
    'btn place-items-center screen-lg-hidden menu-toggle-icon'
  )

  const handleMenuClick = () => setToggle(!toggle)

  const handleThemeClick = () => {
    const theme = localStorage.getItem('damLightTheme')
    if (!theme) {
      localStorage.setItem('damLightTheme', 'active')
      setLightTheme(true)
    } else {
      localStorage.removeItem('damLightTheme')
      setLightTheme(false)
    }
  }

  const handleSearchOpen = () => {
    if (!searchStatus) {
      setSerachStatus(true)
      searchInput.current?.focus()
    } else {
      setSerachStatus(false)
    }
  }

  const handleSearchClose = () => {
    if (searchStatus) setSerachStatus(false)
    else setSerachStatus(true)
  }

  useEffect(() => {
    const onESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSerachStatus(false)
    }
    window.addEventListener('keyup', onESC, false)
    return () => window.addEventListener('keyup', onESC, false)
  }, [])

  useEffect(() => {
    if (toggle) {
      setToggleHeaderClass('header activated')
      setToggleMenuClass('menu activated')
      setToggleMenuIconClass(
        'btn place-items-center screen-lg-hidden menu-toggle-icon activated'
      )
    } else {
      setToggleHeaderClass('header')
      setToggleMenuClass('menu')
      setToggleMenuIconClass(
        'btn place-items-center screen-lg-hidden menu-toggle-icon'
      )
    }
  }, [toggle])

  useEffect(() => {
    if (searchStatus)
      setSearchFormClass('search-form-container container activated')
    else setSearchFormClass('search-form-container container')
  }, [searchStatus])

  useEffect(() => {
    if (lightTheme) {
      document.body.classList.add('light-theme')
      setMoonIconDisplay('d-block')
      setSunIconDisplay('d-none')
    } else {
      document.body.classList.remove('light-theme')
      setMoonIconDisplay('d-none')
      setSunIconDisplay('d-block')
    }
  }, [lightTheme])

  return (
    <>
      <header className={toggleHeaderClass}>
        <nav className='navbar container'>
          <Link href='/'>
            <h2 className='logo'>DAM</h2>
          </Link>

          <div className={toggleMenuClass}>
            <ul className='list'>
              <li className='list-item'>
                <Link href='/' className='list-link current'>
                  Home
                </Link>
              </li>
              <li className='list-item'>
                <Link href='/articles' className='list-link'>
                  Articles
                </Link>
              </li>
              <li className='list-item'>
                <Link href='/official-posts' className='list-link'>
                  Official Posts
                </Link>
              </li>
              <li className='list-item'>
                <Link href='/tags' className='list-link'>
                  Tags
                </Link>
              </li>
              <li className='list-item'>
                <Link href='/new' className='list-link'>
                  Write
                </Link>
              </li>
              <li className='list-item'>
                <Link href='/about' className='list-link'>
                  About
                </Link>
              </li>
              <li className='list-item'>
                <Link href='/contact' className='list-link'>
                  Contact
                </Link>
              </li>
              {user === undefined ? (
                <>
                  <li className='list-item screen-lg-hidden'>
                    <Link href='/sign-in' className='list-link'>
                      Sign in
                    </Link>
                  </li>
                  <li className='list-item screen-lg-hidden'>
                    <Link href='/sign-up' className='list-link'>
                      Sign up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className='list-item screen-lg-hidden'>
                    <Link href='/logout' className='list-link'>
                      Logout
                    </Link>
                  </li>
                  <li className='list-item screen-lg-hidden'>
                    <Link href={`/@${user.username}`} className='list-link'>
                      Profile
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
              onClick={handleSearchOpen}
              className='btn place-items-center'
            >
              <RiSearchLine className='icon' />
            </button>

            <button onClick={handleMenuClick} className={toggleMenuIconClass}>
              <RiMenu3Line className='icon open-menu-icon' />
              <RiCloseLine className='icon close-menu-icon' />
            </button>

            {user === undefined ? (
              <>
                <Link href='/sign-in' className='list-link screen-sm-hidden'>
                  Sign in
                </Link>
                <Link
                  href='/sign-up'
                  className='btn sign-up-btn fancy-border screen-sm-hidden'
                >
                  <span>Sign up</span>
                </Link>
              </>
            ) : (
              <>
                <Link href='logout' className='list-link screen-sm-hidden'>
                  Logout
                </Link>
                <Link
                  href={`/@${user.username}`}
                  className='btn sign-up-btn fancy-border screen-sm-hidden'
                >
                  <span>Profile</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <div className={searchFormClass}>
        <div className='form-container-inner'>
          <form className='form'>
            <input
              ref={searchInput}
              className='form-input'
              type='text'
              placeholder='What are you looking for?'
            />
            <button className='btn form-btn' type='submit'>
              <RiSearchLine className='icon' />
            </button>
          </form>
          <span className='form-note'>Or press ESC to close.</span>
        </div>

        <button
          onClick={handleSearchClose}
          className='btn form-close-btn place-items-center'
        >
          <RiCloseLine className='icon' />
        </button>
      </div>
    </>
  )
}

export default Header
