'use client'

import {
  RiShareForwardLine,
  RiThumbUpLine,
  RiThumbUpFill,
  RiDeleteBinLine,
  RiChat1Line,
  RiCloseLine,
} from 'react-icons/ri'
import { Dispatch, SetStateAction, useState } from 'react'
import page from '@/app/articles/[article]/page.module.css'
import { useComments, useUserComments, usePostComment } from '@/lib/comments'
import {
  useLikeArticle,
  useCheckArticleLike,
  useDeleteArticle,
} from '@/lib/article'
import Comment from './Comment'
import CommentLoading from './skeleton-loading/Comment'
import Modal from './Modal'
import Share from './Share'
import { useSWRConfig } from 'swr'
import toast from 'react-hot-toast'
import { IArticle, IComment } from '@/types'
import { numberFormatter } from '@/utils/compactNumber'
import useCurrentUser from '@/lib/user'

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
}): any {
  const { comments, isLoading, isError } = useComments(page, articleId)
  if (isLoading)
    return (
      <>
        <CommentLoading />
        <CommentLoading />
        <CommentLoading />
      </>
    )
  if (isError) return <h1>comments error...</h1>
  if (comments.length < 10) setNext(false)
  return comments.map((comment: IComment) => {
    articleUserId === comment.user ? (
      <Comment
        comment={comment}
        articleId={articleId}
        articleUserId={articleUserId}
        pageNumber={page}
        key={comment._id}
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
  if (isError) return <h1>fetch user comments error...</h1>
  return userComments.map((comment: IComment) => (
    <Comment
      comment={comment}
      articleId={articleId}
      articleUserId={articleUserId}
      key={comment._id}
    />
  ))
}

export default function CommentSection({ article }: { article: IArticle }) {
  const { currentUser } = useCurrentUser()

  const { mutate } = useSWRConfig()
  const { data, isError, isLoading } = useCheckArticleLike(article._id)

  const [count, setCount] = useState(1)
  const [next, setNext] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [commentBody, setCommentBody] = useState('')
  const [commentsVisible, setCommentsVisible] = useState(false)
  const [articleLikes, setArticleLikes] = useState(article.likes)
  const [hasLiked, setHasLiked] = useState(data && data.liked ? true : false)

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

  const { triggerPostComment, postCommentError, isPostCommentMutating } =
    usePostComment()

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

  const { triggerDeleteArticle, deleteArticleError, isDeleteArticleMutating } =
    useDeleteArticle()

  const handleDeleteClick = async () => {
    try {
      const result = await triggerDeleteArticle({
        body: { articleId: article._id },
      })
      toast.success('Article delete successfully')
      location.assign(window.location.origin)
    } catch (e) {
      console.log({ e, deleteArticleError })
      if (
        deleteArticleError &&
        deleteArticleError.info &&
        deleteArticleError.info.message
      )
        toast.error(deleteArticleError.info.message)
      else toast('An unexpected error occurred')
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
      if (
        likeArticleError &&
        likeArticleError.info &&
        likeArticleError.info.message
      ) {
        toast.error(likeArticleError.info.message)
        return
      }
      toast.success('Article upvoted')
      setArticleLikes(articleLikes + 1)
      setHasLiked(true)
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/check-like/${article._id}`
      )
    } catch (e) {
      // error handling
      toast.error('Could not like article')
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
          <button
            type='submit'
            disabled={commentBody === '' || isPostCommentMutating}
          >
            Post
          </button>
        </form>
        {/* Comment container */}
        {currentUser && FetchUserComments(article._id, article.user)}
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
        <button onClick={handleLike} disabled={hasLiked}>
          {hasLiked ? <RiThumbUpFill /> : <RiThumbUpLine />}
          {numberFormatter(articleLikes)}
        </button>
        <button onClick={() => setCommentsVisible(!commentsVisible)}>
          <RiChat1Line /> {numberFormatter(article.comments)}
        </button>
        <button onClick={() => setShowModal(true)}>
          <RiShareForwardLine />
          Share
        </button>
        {currentUser && article.user && currentUser._id === article.user ? (
          <button onClick={handleDeleteClick}>
            <RiDeleteBinLine /> Delete
          </button>
        ) : null}
      </div>
      {/* Modal */}
      <Modal showModal={showModal} onCloseModal={setShowModal}>
        <Share shareUrl={article.url} />
      </Modal>
    </>
  )
}
