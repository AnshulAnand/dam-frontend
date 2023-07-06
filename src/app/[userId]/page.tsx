'use client'

import {
  RiMapPinUserLine,
  RiLink,
  RiCake2Line,
  RiEyeLine,
  RiFileList3Line,
} from 'react-icons/ri'
import returnDate from '@/utils/returnDate'
import ProfileEditBtn from '@/components/ProfileEditBtn'
import UserProfileArticles from '@/components/UserProfileArticles'
import User from '@/components/skeleton-loading/User'
import { useUserByUsername } from '@/lib/user'
import { numberFormatter } from '@/utils/compactNumber'
import page from './page.module.css'

export default function Profile({ params }: { params: { userId: string } }) {
  const username = params.userId.replace('%40', '')

  const { user, isLoading, isError } = useUserByUsername(username)

  if (isLoading) return <User />

  if (!user || isError) {
    console.log({ isError })
    throw new Error('User not found')
  }

  return (
    <section className={page.section}>
      <div className={page.container}>
        <main className={page.main}>
          <img src={user.image} alt={user.username} width={200} height={200} />
          <div className={page.user_data}>
            <div className={page.user_name}>
              <h1>{user.name}</h1>
              <h1>(@{user.username})</h1>
            </div>
            <div className={page.user_bio}>
              <p>{user.bio}</p>
            </div>
            <div className={page.user_info}>
              <div>
                <RiCake2Line className='icon' /> {returnDate(user)}
              </div>
              {user.country !== '' && (
                <div>
                  <RiMapPinUserLine className='icon' /> {user.country}
                </div>
              )}
              <div>
                <RiEyeLine className='icon' />
                {numberFormatter(user.views)} content views
              </div>
              <div>
                <RiFileList3Line className='icon' />
                {numberFormatter(user.articles)} articles
              </div>
            </div>
            {user.link !== '' && (
              <div className={page.user_link}>
                <RiLink className='icon' />
                <a href={user.link} target='_blank'>
                  {user.link.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </div>
            )}
            <ProfileEditBtn visitor={user} />
          </div>
        </main>
        <div className={page.user_articles}>
          <UserProfileArticles visitor={user} />
        </div>
      </div>
    </section>
  )
}
