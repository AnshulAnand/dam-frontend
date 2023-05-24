'use client'

import {
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiCloseLine,
} from 'react-icons/ri'
import { useEffect, useRef, useState } from 'react'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'
import Reply from './Reply'

function Comments() {
  const [repliesVisible, setRepliesVisible] = useState(false)
  const [repliesVisibleClass, setRepliesVisibleClass] = useState('d-none')
  // const [commentVisible, setCommentVisible] = useState(false)
  // const [showCommentClass, setShowCommentClass] = useState('')
  // const closeCommentsBtn = useRef()

  // const toggleComments = () => {
  // if (commentVisible) setCommentVisible(false)
  // else setCommentVisible(true)
  // closeCommentsBtn.current.classList.add('visible')
  // }

  const showReplies = () => {
    if (repliesVisible) setRepliesVisible(false)
    else setRepliesVisible(true)
  }

  useEffect(() => {
    if (repliesVisible) setRepliesVisibleClass('d-block')
    else setRepliesVisibleClass('d-none')
  }, [repliesVisible])

  // useEffect(() => {
  //   if (showCommentClass === '') setShowCommentClass('visible')
  //   else setShowCommentClass('')
  // }, [commentVisible])

  return (
    <div className={`${page.comments}`}>
      <div className={page.comments_header}>
        <h2>Comments</h2>
        <button>
          <RiCloseLine />
        </button>
      </div>
      {/* Comment container */}
      <div className={page.comment}>
        {/* Parent comment */}
        <div className={page.comment_parent}>
          <div className={page.profile}>
            <Profile width={40} height={40} forArticle={false} />
            <div className={page.btn_container}>
              <button className={page.edit_btn}>
                <RiPencilLine />
              </button>
              <button
                style={{ marginLeft: '1rem' }}
                className={page.delete_btn}
              >
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            quidem asperiores veniam perspiciatis voluptas ipsam quae quia?
            Officia, odit et? Fugit illum quod expedita ratione laboriosam atque
            inventore numquam enim.
          </p>
        </div>
        <button className={page.button}>
          <RiThumbUpLine />
        </button>
        <button className={page.button} style={{ marginLeft: '1rem' }}>
          Reply
        </button>
        <button
          id='1'
          onClick={showReplies}
          style={{ marginLeft: '1rem' }}
          className={page.button}
        >
          Replies
        </button>
        {/* Child comments */}
        <div className={`${page.replies} ${repliesVisibleClass}`}>
          <Reply />
          <Reply />
          <Reply />
        </div>
      </div>
      <div className={page.comment}>
        {/* Parent comment */}
        <div className={page.comment_parent}>
          <div className={page.profile}>
            <Profile width={40} height={40} forArticle={false} />
            <div className={page.btn_container}>
              <button className={page.edit_btn}>
                <RiPencilLine />
              </button>
              <button
                style={{ marginLeft: '1rem' }}
                className={page.delete_btn}
              >
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            quidem asperiores veniam perspiciatis voluptas ipsam quae quia?
            Officia, odit et? Fugit illum quod expedita ratione laboriosam atque
            inventore numquam enim.
          </p>
        </div>
        <button className={page.button}>
          <RiThumbUpLine />
        </button>
        <button className={page.button} style={{ marginLeft: '1rem' }}>
          Reply
        </button>
        <button
          id='2'
          onClick={showReplies}
          style={{ marginLeft: '1rem' }}
          className={page.button}
        >
          Replies
        </button>
        {/* Child comments */}
        <div className={`${page.replies} ${repliesVisibleClass}`}>
          <Reply />
          <Reply />
          <Reply />
        </div>
      </div>
    </div>
  )
}

export default Comments
