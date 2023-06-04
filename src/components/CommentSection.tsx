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
import { useComments, postComment } from '@/lib/comments'
import Comment from './Comment'
import useSWRMutation from 'swr/mutation'

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

function CommentSection({ articleId }: { articleId: string }) {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/comments',
    postComment /* options */
  )

  const [count, setCount] = useState(1)
  const [commentBody, setCommentBody] = useState('')

  let list: any = []
  for (let i = 0; i < count; i++) {
    list.push(<FetchComments page={i + 1} articleId={articleId} />)
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await trigger(
        {
          comment: { body: commentBody, parentArticle: articleId },
        } /* options */
      )
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  return (
    <>
      <div className={`${page.comments} ${commentsVisibleClass}`}>
        <div className={page.comments_header}>
          <h2>Comments</h2>
          <button onClick={hideComments}>
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
