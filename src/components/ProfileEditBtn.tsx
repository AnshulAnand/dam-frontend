'use client'
import useSWR from 'swr'
import Link from 'next/link'
import page from '@/app/[userId]/page.module.css'

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

function useCurrentUser() {
  const { data, error, isLoading } = useSWR(
    'http://localhost:5000/users/current',
    fetcher
  )
  return { data, isLoading, isError: error }
}

function ProfileEditBtn({ user }: { user: any }) {
  const { data, isLoading, isError } = useCurrentUser()
  if (isError) console.log({isError})
  console.log(data)

if (!user || !data) {
	console.log('user or data not found')
	return
}

  return (
  	<div>
  	  {user._id === data._id && (<Link className={page.profile_edit} href='/edit-profile'>Edit Profile</Link>)}  		
  	</div>
  	)
}

export default ProfileEditBtn