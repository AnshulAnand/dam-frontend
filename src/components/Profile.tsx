'use client'

import ProfileSkeleton from './skeleton-loading/Profile'
import Link from 'next/link'
import { useUserById } from '@/lib/user'

export default function Profile({
  userId,
  width,
  height,
  forArticle,
  commentUserId,
  articleUserId,
}: {
  userId: string
  width: number
  height: number
  forArticle: boolean
  commentUserId: string | null
  articleUserId: string | null
}) {
  const { user, isLoading, isError } = useUserById(userId)

  if (isLoading) return <ProfileSkeleton />
  if (isError) return <h1>error...</h1>

  return (
    <Link href={`/@${user.username}`} className='profile'>
      <img
        src='/images/featured/featured-1.jpg'
        alt={`${user.name}`}
        width={width}
        height={height}
      />
      {forArticle ? (
        <div style={{ marginLeft: '60px' }}>
          <p>{user.name}</p>
          <small>@{user.username}</small>
        </div>
      ) : (
        <div style={{ marginLeft: '50px' }}>
          <small>9th May 2023</small>
          {articleUserId === commentUserId ? (
            <small
              style={{
                paddingInline: '7px',
                borderRadius: '100px',
                backgroundColor: 'gold',
                color: 'black',
              }}
            >
              @{user.username}
            </small>
          ) : (
            <small>@{user.username}</small>
          )}
        </div>
      )}
    </Link>
  )
}
