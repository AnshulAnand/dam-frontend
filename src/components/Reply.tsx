'use client'

import {
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiMessage3Line,
} from 'react-icons/ri'
import { useState } from 'react'
import useCurrentUser from '@/lib/user'
import { usePostReply, useEditReply, useDeleteReply } from '@/lib/replies'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'

function Reply({
  reply,
  articleId,
  commentId,
}: {
  reply: any
  articleId: string
  commentId: string
}) {
  const [replyBody, setReplyBody] = useState('')
  const [editedReplyBody, setEditedReplyBody] = useState(reply.body)

  const handleEditBtnClick = () => {
    setEditedReplyBody(reply.body)
    setEditReplyInputVisible(!editReplyInputVisible)
  }

  // POST Reply
  const { triggerPostReply, postReplyError } = usePostReply()

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerPostReply(
        {
          reply: {
            body: replyBody,
            parentArticle: articleId,
            parentComment: commentId,
          },
        } /* options */
      )
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  // EDIT Reply
  const { triggerEditReply, editReplyError } = useEditReply()

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerEditReply(
        {
          editedReply: {
            body: editedReplyBody,
            parentArticle: articleId,
            parentComment: commentId,
            replyId: reply._id,
          },
        } /* options */
      )
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  // DELETE Reply
  const { triggerDeleteReply, deleteReplyError } = useDeleteReply()

  const handleDeleteSubmit = async () => {
    try {
      const result = await triggerDeleteReply(
        {
          body: {
            replyId: reply._id,
          },
        } /* options */
      )
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  const { user, isLoading, isError } = useCurrentUser()

  const [replyInputVisible, setReplyInputVisible] = useState(false)
  const [editReplyInputVisible, setEditReplyInputVisible] = useState(false)

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
              <button className={page.btn} onClick={handleEditBtnClick}>
                <RiPencilLine />
              </button>
              <button className={page.btn} onClick={handleDeleteSubmit}>
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
          <RiThumbUpLine className={page.icon} /> {reply.likes}
        </button>
        <button
          onClick={() => setReplyInputVisible(!replyInputVisible)}
          className={page.btn}
        >
          <RiMessage3Line className={page.icon} />
        </button>
      </div>
      {/* POST Reply */}
      <form
        onSubmit={handleReplySubmit}
        className={`${page.reply_input} ${
          replyInputVisible ? 'd-block' : 'd-none'
        }`}
      >
        <textarea
          onChange={e => setReplyBody(e.target.value)}
          placeholder='Write your reply...'
        />
        <button type='submit'>Post</button>
      </form>
      {/* EDIT Reply */}
      <form
        onSubmit={handleEditSubmit}
        className={`${page.reply_input} ${
          editReplyInputVisible ? 'd-block' : 'd-none'
        }`}
      >
        <textarea
          value={editedReplyBody}
          onChange={e => setEditedReplyBody(e.target.value)}
          placeholder='Write your reply...'
        />
        <button type='submit'>Post</button>
      </form>
    </div>
  )
}

export default Reply
