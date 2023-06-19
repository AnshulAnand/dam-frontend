'use client'

import Link from 'next/link'
import useCurrentUser from '@/lib/user'
import page from '@/app/[userId]/page.module.css'

export default function ProfileEditBtn({ visitor }: { visitor: any }) {
  const { currentUser, isLoading, isError } = useCurrentUser()
  if (isError) console.log({ isError })

  if (!visitor || !currentUser) console.log('user not found')

  return (
    <div>
      {visitor && currentUser && visitor._id === currentUser._id && (
        <Link className={page.profile_edit} href='/edit-profile'>
          Edit Profile
        </Link>
      )}
    </div>
  )
}
