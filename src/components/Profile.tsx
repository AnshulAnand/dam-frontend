'use client'

import Link from 'next/link'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

function useUser(id: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/users/id/${id}`,
    fetcher
  )

  return {
    user: data,
    isLoading,
    isError: error,
  }
}

export default function Profile({
  userId,
  width,
  height,
  forArticle,
}: {
  userId: string
  width: number
  height: number
  forArticle: boolean
}) {
  const { user, isLoading, isError } = useUser(userId)

  if (isLoading) return <h1>loading...</h1>
  if (isError) return <h1>error...</h1>

  console.log(user)

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
          <small>{user.username}</small>
        </div>
      ) : (
        <div style={{ marginLeft: '50px' }}>
          <small>9th May 2023</small>
          <small>{user.username}</small>
        </div>
      )}
    </Link>
  )
}
