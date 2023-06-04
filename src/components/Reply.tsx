'use client'

import {
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiMessage3Line,
} from 'react-icons/ri'
import React, { useState, useEffect } from 'react'
import useCurrentUser from '@/lib/user'
import { postReply } from '@/lib/replies'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'
import useSWRMutation from 'swr/mutation'

function Reply({
  reply,
  articleId,
  commentId,
}: {
  reply: any
  articleId: string
  commentId: string
}) {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/replies',
    postReply /* options */
  )

  const [replyBody, setReplyBody] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await trigger(
        {
          reply: {
            body: replyBody,
            parentArticle: articleId,
            parentComment: commentId,
          },
        } /* options */
      )
      console.log({ data })
      console.log({ result })
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  const { user, isLoading, isError } = useCurrentUser()

  const [isVisible, setIsVisible] = useState(false)
  const [showReplyInputClass, setShowReplyInputClass] = useState('d-none')

  const showReplyInput = () => {
    if (isVisible) setIsVisible(false)
    else setIsVisible(true)
  }

  useEffect(() => {
    if (isVisible) setShowReplyInputClass('d-blobk')
    else setShowReplyInputClass('d-none')
  }, [isVisible])

  return (
    <div className={page.reply}>
      <div className={page.profile}>
        <Profile
          userId={reply.user}
          width={40}
          height={40}
          forArticle={false}
        />
        <div className={page.btn_container}>
          {user && user._id === reply.user ? (
            <>
              <button className={page.btn}>
                <RiPencilLine />
              </button>
              <button className={page.btn}>
                <RiDeleteBinLine />
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <p>{reply.body}</p>
      <div className={page.btn_container}>
        <button className={`${page.btn} ${page.comment_btn}`}>
          <RiThumbUpLine className={page.icon} /> 176
        </button>
        <button onClick={showReplyInput} className={page.btn}>
          <RiMessage3Line className={page.icon} />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className={`${page.reply_input} ${showReplyInputClass}`}
      >
        <textarea
          onChange={e => setReplyBody(e.target.value)}
          placeholder='Write your reply...'
        />
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}

export default Reply
