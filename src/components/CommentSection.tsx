'use client'

import {
  RiShareForwardLine,
  RiThumbUpLine,
  RiPencilLine,
  RiChat1Line,
  RiCloseLine,
} from 'react-icons/ri'
import { Dispatch, SetStateAction, useState } from 'react'
import page from '@/app/articles/[article]/page.module.css'
import { useComments, useUserComments, usePostComment } from '@/lib/comments'
import { useLikeArticle } from '@/lib/article'
import Comment from './Comment'
import CommentLoading from './skeleton-loading/Comment'
import Modal from './Modal'
import Share from './Share'
import { useSWRConfig } from 'swr'
import toast from 'react-hot-toast'

function FetchComments({
  page,
  articleId,
  articleUserId,
  setNext,
}: {
  page: number
  articleId: string
  articleUserId: string
  setNext: Dispatch<SetStateAction<boolean>>
}) {
  const { comments, isLoading, isError } = useComments(page, articleId)
  if (isLoading)
    return (
      <>
        <CommentLoading />
        <CommentLoading />
        <CommentLoading />
      </>
    )
  if (isError) return <h1>error...</h1>
  if (comments.length < 10) setNext(false)
  return comments.map((comment: any, i: number) => {
    articleUserId === comment.user ? (
      <Comment
        comment={comment}
        articleId={articleId}
        articleUserId={articleUserId}
        key={i}
      />
    ) : null
  })
}

function FetchUserComments(articleId: string, articleUserId: string) {
  const { userComments, isLoading, isError } = useUserComments(articleId)
  if (isLoading)
    return (
      <>
        <CommentLoading />
        <CommentLoading />
        <CommentLoading />
      </>
    )
  if (isError) return <h1>error...</h1>
  return userComments.map((comment: any, i: number) => (
    <Comment
      comment={comment}
      articleId={articleId}
      articleUserId={articleUserId}
      key={i}
    />
  ))
}

export default function CommentSection({ article }: { article: any }) {
  const { mutate } = useSWRConfig()

  const [next, setNext] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [count, setCount] = useState(1)
  const [commentBody, setCommentBody] = useState('')

  let list: Array<any> = []
  for (let i = 0; i < count; i++) {
    list.push(
      <FetchComments
        page={i + 1}
        articleId={article._id}
        articleUserId={article.user}
        setNext={setNext}
      />
    )
  }

  const [commentsVisible, setCommentsVisible] = useState(false)

  const { triggerPostComment, postCommentError } = usePostComment()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerPostComment(
        {
          body: { body: commentBody, parentArticle: article._id },
        } /* options */
      )
      setCommentBody('')
      mutate(`${process.env.NEXT_PUBLIC_API_URL}/comments/${article._id}`)
      toast.success('Comment Posted')
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not post comment')
    }
  }

  const { triggerLikeArticle, likeArticleError } = useLikeArticle()

  const handleLike = async () => {
    try {
      const result = await triggerLikeArticle(
        {
          body: { articleId: article._id },
        } /* options */
      )
      toast.success('Comment liked')
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not like comment')
    }
  }

  return (
    <>
      <div className={`${page.comments} ${commentsVisible ? 'visible' : ''}`}>
        <div className={page.comments_header}>
          <h2>Comments</h2>
          <button onClick={() => setCommentsVisible(!commentsVisible)}>
            <RiCloseLine />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={`${page.comments_input}`}>
          <textarea
            value={commentBody}
            onChange={e => setCommentBody(e.target.value)}
            placeholder='Write your comment...'
          />
          <button type='submit'>Post</button>
        </form>
        {/* Comment container */}
        {FetchUserComments(article._id, article.user)}
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
      {/* Controls */}
      <div className={page.controls}>
        <button onClick={handleLike}>
          <RiThumbUpLine /> {article.likes}
        </button>
        <button onClick={() => setCommentsVisible(!commentsVisible)}>
          <RiChat1Line /> {article.comments}
        </button>
        <button onClick={() => setShowModal(true)}>
          <RiShareForwardLine />
          Share
        </button>
        <button>
          <RiPencilLine /> Edit
        </button>
      </div>
      {/* Modal */}
      <Modal showModal={showModal} onCloseModal={setShowModal}>
        <Share shareUrl={article.url} />
      </Modal>
    </>
  )
}
