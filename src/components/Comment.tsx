'use client'

import {
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiChat1Line,
  RiMessage3Line,
} from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import useCurrentUser from '@/lib/user'
import { useReplies, postReply } from '@/lib/replies'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'
import Reply from './Reply'
import useSWRMutation from 'swr/mutation'

function FetchReplies({
  page,
  articleId,
  commentId,
}: {
  page: number
  articleId: string
  commentId: string
}) {
  const { replies, isLoading, isError } = useReplies(page, articleId, commentId)
  if (isLoading) return <h1>loading...</h1>
  if (isError) return <h1>error...</h1>
  return replies.map((reply: any, i: number) => (
    <Reply reply={reply} articleId={articleId} commentId={commentId} key={i} />
  ))
}

const Comment = ({
  comment,
  articleId,
}: {
  comment: any
  articleId: string
}) => {
  const [repliesVisible, setRepliesVisible] = useState(false)
  const [repliesVisibleClass, setRepliesVisibleClass] = useState('d-none')
  const [isVisible, setIsVisible] = useState(false)
  const [showReplyInputClass, setShowReplyInputClass] = useState('d-none')
  const [replyBody, setReplyBody] = useState('')

  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/replies',
    postReply /* options */
  )

  if (error) console.log(error)

  const { user, isLoading, isError } = useCurrentUser()

  const [count, setCount] = useState(1)

  let list: any = []
  for (let i = 0; i < count; i++) {
    list.push(
      <FetchReplies
        page={i + 1}
        articleId={articleId}
        commentId={comment._id}
      />
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await trigger(
        {
          reply: {
            body: replyBody,
            parentArticle: articleId,
            parentComment: comment._id,
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

  const showReplyInput = () => {
    if (isVisible) setIsVisible(false)
    else setIsVisible(true)
  }

  useEffect(() => {
    if (isVisible) setShowReplyInputClass('d-blobk')
    else setShowReplyInputClass('d-none')
  }, [isVisible])

  const showReplies = () => {
    if (repliesVisible) setRepliesVisible(false)
    else setRepliesVisible(true)
  }

  useEffect(() => {
    if (repliesVisible) setRepliesVisibleClass('d-block')
    else setRepliesVisibleClass('d-none')
  }, [repliesVisible])

  const editBtnClick = () => {
    if (isVisible) setIsVisible(false)
    else setIsVisible(true)
  }

  return (
    <div className={page.comment}>
      {/* Parent comment */}
      <div className={page.comment_parent}>
        <div className={page.profile}>
          <Profile
            userId={comment.user}
            width={40}
            height={40}
            forArticle={false}
          />
          <div className={page.btn_container}>
            {user && user._id === comment.user ? (
              <>
                <button className={page.btn} onClick={editBtnClick}>
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
        <p>{comment.body}</p>
      </div>
      <div className={page.btn_container}>
        <button className={`${page.btn} ${page.comment_btn}`}>
          <RiThumbUpLine className={page.icon} /> 287
        </button>
        <button
          className={`${page.btn} ${page.comment_btn}`}
          onClick={showReplies}
        >
          <RiChat1Line className={page.icon} /> 198
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
      {/* Child comments */}
      <div className={`${page.replies} ${repliesVisibleClass}`}>
        {list}
        <button
          onClick={() => setCount(count + 1)}
          className={page.btn_load_more}
        >
          Load More
        </button>
      </div>
    </div>
  )
}
export default Comment
