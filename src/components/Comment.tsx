'use client'

import {
  RiThumbUpLine,
  RiThumbUpFill,
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
import { useCheckCommentLike } from '@/lib/comments'
import { useReplies, usePostReply } from '@/lib/replies'
import page from '@/app/articles/[article]/page.module.css'
import Profile from './Profile'
import Reply from './Reply'
import CommentLoading from './skeleton-loading/Comment'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSWRConfig } from 'swr'
import { toast } from 'react-hot-toast'
import { IComment, IReply } from '@/types'

function FetchReplies({
  page,
  articleId,
  commentId,
  setNext,
}: {
  page: number
  articleId: string
  commentId: string
  setNext: Dispatch<SetStateAction<boolean>>
}): any {
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
  if (replies.length < 10) setNext(false)
  return replies.map((reply: IReply) => (
    <Reply
      reply={reply}
      articleId={articleId}
      commentId={commentId}
      key={reply._id}
    />
  ))
}

export default function Comment({
  comment,
  articleId,
  articleUserId,
  pageNumber,
}: {
  comment: IComment
  articleId: string
  articleUserId: string
  pageNumber?: number
}) {
  const { mutate } = useSWRConfig()
  const { currentUser, isLoading, isError } = useCurrentUser()
  const { data } = useCheckCommentLike(comment._id)

  const [count, setCount] = useState(1)
  const [next, setNext] = useState(true)
  const [repliesVisible, setRepliesVisible] = useState(false)
  const [replyInputVisible, setReplyInputVisible] = useState(false)
  const [editCommentInputVisible, setEditCommentInputVisible] = useState(false)
  const [replyBody, setReplyBody] = useState('')
  const [commentBody, setCommentBody] = useState(comment.body)
  const [commentLikes, setCommentLikes] = useState(comment.likes)
  const [hasLiked, setHasLiked] = useState(data && data.liked ? true : false)

  let list: Array<any> = []
  for (let i = 0; i < count; i++) {
    list.push(
      <FetchReplies
        page={i + 1}
        articleId={articleId}
        commentId={comment._id}
        setNext={setNext}
      />
    )
  }

  const handleEditBtnClick = () => {
    setCommentBody(comment.body)
    setEditCommentInputVisible(!editCommentInputVisible)
  }

  // POST Reply
  const { triggerPostReply, postReplyError, isPostReplyMutating } =
    usePostReply()

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
      // mutate(
      //   `${
      //     process.env.NEXT_PUBLIC_API_URL
      //   }/replies?page=${count}&limit=${4}&articleId=${articleId}&commentId=${
      //     comment._id
      //   }`
      // )
      mutate(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/comments?page=${pageNumber}&limit=${10}&articleId=${articleId}`
      )
      toast.success('Reply posted')
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not post reply')
    }
  }

  // EDIT Comment
  const { triggerEditComment, editCommentError, isEditCommentMutating } =
    useEditComment()

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
      setCommentLikes(commentLikes + 1)
      setHasLiked(true)
      toast.success('Comment upvoted')
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
            {currentUser && currentUser._id === comment.user ? (
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
        <p>
          <pre>{comment.body}</pre>
        </p>
      </div>
      <div className={page.btn_container}>
        <button
          className={`${page.btn} ${page.comment_btn}`}
          onClick={handleLike}
          disabled={hasLiked}
        >
          {hasLiked ? (
            <RiThumbUpFill className={page.icon} />
          ) : (
            <RiThumbUpLine className={page.icon} />
          )}
          {commentLikes}
        </button>
        <button
          className={`${page.btn} ${page.comment_btn}`}
          onClick={() => setRepliesVisible(!repliesVisible)}
        >
          <RiChat1Line className={page.icon} /> {comment.replies}
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
        <button
          type='submit'
          disabled={replyBody === '' || isPostReplyMutating}
        >
          Post
        </button>
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
        <button
          type='submit'
          disabled={commentBody === '' || isEditCommentMutating}
        >
          Post
        </button>
      </form>
      {/* Child comments */}
      <div
        className={`${page.replies} ${repliesVisible ? 'd-block' : 'd-none'}`}
      >
        {list}
        {next ? (
          <button
            onClick={() => setCount(count + 1)}
            className={page.btn_load_more}
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  )
}
