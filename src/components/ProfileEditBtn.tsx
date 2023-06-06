'use client'
import Link from 'next/link'
import useCurrentUser from '@/lib/user'
import page from '@/app/[userId]/page.module.css'

export default function ProfileEditBtn({ visitor }: { visitor: any }) {
  const { user, isLoading, isError } = useCurrentUser()
  if (isError) console.log({ isError })

  if (!visitor || !user) console.log('user not found')

  return (
    <div>
      {visitor && user && visitor._id === user._id && (
        <Link className={page.profile_edit} href='/edit-profile'>
          Edit Profile
        </Link>
      )}
    </div>
  )
}
