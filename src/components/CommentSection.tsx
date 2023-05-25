'use client'

import {
  RiShareForwardLine,
  RiThumbUpLine,
  RiPencilLine,
  RiChat1Line,
  RiCloseLine,
} from 'react-icons/ri'
import { useEffect, useState } from 'react'
import page from '@/app/articles/[article]/page.module.css'
import Comment from './Comment'

function CommentSection() {
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [commentsVisibleClass, setCommentsVisibleClass] = useState('')

  const showComments = () => {
    if (!commentsVisible) setCommentsVisible(true)
  }

  const hideComments = () => {
    if (commentsVisible) setCommentsVisible(false)
  }

  useEffect(() => {
    if (commentsVisible) setCommentsVisibleClass('visible')
    else setCommentsVisibleClass('')
  }, [commentsVisible])

  return (
    <>
      <div className={`${page.comments} ${commentsVisibleClass}`}>
        <div className={page.comments_header}>
          <h2>Comments</h2>
          <button onClick={hideComments}>
            <RiCloseLine />
          </button>
        </div>
        <form className={`${page.comments_input}`}>
          <textarea placeholder='Write your comment...' />
        </form>
        {/* Comment container */}
        <Comment />
        <Comment />
      </div>
      {/* Controls */}
      <div className={page.controls}>
        <button>
          <RiThumbUpLine />5
        </button>
        <button onClick={showComments}>
          <RiChat1Line />9
        </button>
        <button>
          <RiShareForwardLine />
          Share
        </button>
        <button>
          <RiPencilLine /> Edit
        </button>
      </div>
    </>
  )
}

export default CommentSection
