'use client'

import {
  RiShareForwardLine,
  RiThumbUpLine,
  RiPencilLine,
  RiChat1Line,
  RiCloseLine,
} from 'react-icons/ri'
import { useState } from 'react'
import page from '@/app/articles/[article]/page.module.css'
import { useComments, usePostComment } from '@/lib/comments'
import { useLikeArticle } from '@/lib/article'
import Comment from './Comment'

function FetchComments({
  page,
  articleId,
}: {
  page: number
  articleId: string
}) {
  const { comments, isLoading, isError } = useComments(page, articleId)
  if (isLoading) return <h1>loading...</h1>
  if (isError) return <h1>error...</h1>
  return comments.map((comment: any, i: number) => (
    <Comment comment={comment} articleId={articleId} key={i} />
  ))
}

function CommentSection({ article }: { article: any }) {
  const [count, setCount] = useState(1)
  const [commentBody, setCommentBody] = useState('')

  let list: any = []
  for (let i = 0; i < count; i++) {
    list.push(<FetchComments page={i + 1} articleId={article._id} />)
  }

  const [commentsVisible, setCommentsVisible] = useState(false)

  const { triggerPostComment, postCommentError } = usePostComment()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerPostComment(
        {
          comment: { body: commentBody, parentArticle: article._id },
        } /* options */
      )
    } catch (e) {
      // error handling
      console.log(e)
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
    } catch (e) {
      // error handling
      console.log(e)
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
            onChange={e => setCommentBody(e.target.value)}
            placeholder='Write your comment...'
          />
          <button type='submit'>Post</button>
        </form>
        {/* Comment container */}
        {list}
        <button
          onClick={() => setCount(count + 1)}
          className={page.btn_load_more}
        >
          Load More
        </button>
      </div>
      {/* Controls */}
      <div className={page.controls}>
        <button onClick={handleLike}>
          <RiThumbUpLine /> {article.likes}
        </button>
        <button onClick={() => setCommentsVisible(!commentsVisible)}>
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
