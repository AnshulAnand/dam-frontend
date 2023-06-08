'use client'

import { useRouter } from 'next/navigation'
import { RiSearchLine, RiCloseLine } from 'react-icons/ri'
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'

function SearchBox({
  searchOpen,
  setSearchOpen,
}: {
  searchOpen: boolean
  setSearchOpen: Dispatch<SetStateAction<boolean>>
}) {
  const { push } = useRouter()
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    push(`/articles/search?searchText=${searchText}`)
    setSearchOpen(false)
  }

  useEffect(() => searchInput.current?.focus())

  return (
    <div
      className={`search-form-container container ${
        searchOpen ? 'activated' : ''
      }`}
    >
      <div className='form-container-inner'>
        <form className='form' onSubmit={handleSubmit}>
          <input
            onChange={e => setSearchText(e.target.value)}
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
        onClick={() => setSearchOpen(!searchOpen)}
        className='btn form-close-btn place-items-center'
      >
        <RiCloseLine className='icon' />
      </button>
    </div>
  )
}

export default SearchBox
