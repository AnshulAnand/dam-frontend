'use client'

import {
  RiThumbUpLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiChat1Line,
  RiMessage3Line,
} from 'react-icons/ri'
import {
  useEditComment,
  useDeleteComment,
  useLikeComment,
} from '@/lib/comments'
import useCurrentUser from '@/lib/user'
import { useReplies } from '@/lib/replies'
import { usePostReply } from '@/lib/replies'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'
import Reply from './Reply'
import CommentLoading from './skeleton-loading/Comment'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import { toast } from 'react-hot-toast'

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
  if (isLoading)
    return (
      <>
        <CommentLoading />
        <CommentLoading />
        <CommentLoading />
      </>
    )
  if (isError) return <h1>error...</h1>
  return replies.map((reply: any, i: number) => (
    <Reply reply={reply} articleId={articleId} commentId={commentId} key={i} />
  ))
}

export default function Comment({
  comment,
  articleId,
  articleUserId,
}: {
  comment: any
  articleId: string
  articleUserId: string
}) {
  const { mutate } = useSWRConfig()

  const [repliesVisible, setRepliesVisible] = useState(false)
  const [replyInputVisible, setReplyInputVisible] = useState(false)
  const [editCommentInputVisible, setEditCommentInputVisible] = useState(false)
  const [replyBody, setReplyBody] = useState('')
  const [commentBody, setCommentBody] = useState(comment.body)

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

  const handleEditBtnClick = () => {
    setCommentBody(comment.body)
    setEditCommentInputVisible(!editCommentInputVisible)
  }

  // POST Reply
  const { triggerPostReply, postReplyError } = usePostReply()

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerPostReply(
        {
          body: {
            body: replyBody,
            parentArticle: articleId,
            parentComment: comment._id,
          },
        } /* options */
      )
      setReplyBody('')
      setReplyInputVisible(false)
      mutate(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/replies?page=${count}&limit=${4}&articleId=${articleId}&commentId=${
          comment._id
        }`
      )
      toast.success('Reply posted')
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not post reply')
    }
  }

  // EDIT Comment
  const { triggerEditComment, editCommentError } = useEditComment()

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerEditComment(
        {
          body: {
            body: commentBody,
            parentArticle: articleId,
            commentId: comment._id,
          },
        } /* options */
      )
      toast.success('Comment edited')
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not edit comment')
    }
  }

  // DELETE Comment
  const { triggerDeleteComment, deleteCommentError } = useDeleteComment()
  const handleDeleteBtnClick = async () => {
    try {
      const result = await triggerDeleteComment({
        body: {
          commentId: comment._id,
        },
      })
      toast.success('Comment deleted')
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not delete comment')
    }
  }

  // LIKE Comment
  const { triggerLikeComment, likeCommentError } = useLikeComment()
  const handleLike = async () => {
    try {
      const result = await triggerLikeComment({
        body: {
          parentArticle: articleId,
          commentId: comment._id,
        },
      })
      toast.success('Liked comment')
    } catch (e) {
      console.log(e)
      toast.error('Could not like comment')
    }
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
            commentUserId={comment.user}
            articleUserId={articleUserId}
          />
          <div className={page.btn_container}>
            {user && user._id === comment.user ? (
              <>
                <button className={page.btn} onClick={handleEditBtnClick}>
                  <RiPencilLine />
                </button>
                <button className={page.btn} onClick={handleDeleteBtnClick}>
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
        <button
          className={`${page.btn} ${page.comment_btn}`}
          onClick={handleLike}
        >
          <RiThumbUpLine className={page.icon} /> {comment.likes}
        </button>
        <button
          className={`${page.btn} ${page.comment_btn}`}
          onClick={() => setRepliesVisible(!repliesVisible)}
        >
          <RiChat1Line className={page.icon} /> 198
        </button>
        <button
          onClick={() => setReplyInputVisible(!replyInputVisible)}
          className={page.btn}
        >
          <RiMessage3Line className={page.icon} />
        </button>
      </div>
      {/* Reply input form */}
      <form
        onSubmit={handleReplySubmit}
        className={`${page.reply_input} ${
          replyInputVisible ? 'd-block' : 'd-none'
        }`}
      >
        <textarea
          value={replyBody}
          onChange={e => setReplyBody(e.target.value)}
          placeholder='Write your reply...'
        />
        <button type='submit'>Post</button>
      </form>
      {/* Edit comment form */}
      <form
        onSubmit={handleEditSubmit}
        className={`${page.reply_input} ${
          editCommentInputVisible ? 'd-block' : 'd-none'
        }`}
      >
        <textarea
          value={commentBody}
          onChange={e => setCommentBody(e.target.value)}
          placeholder='Write your reply...'
        />
        <button type='submit'>Post</button>
      </form>
      {/* Child comments */}
      <div
        className={`${page.replies} ${repliesVisible ? 'd-block' : 'd-none'}`}
      >
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
