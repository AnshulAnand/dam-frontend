import {
  RiMapPinUserLine,
  RiLink,
  RiCake2Line,
  RiEyeLine,
  RiFileList3Line,
} from 'react-icons/ri'
import { GET } from '@/utils/fetch'
import returnDate from '@/utils/returnDate'
import ProfileEditBtn from '@/components/ProfileEditBtn'
import UserProfileArticles from '@/components/UserProfileArticles'
import page from './page.module.css'
import { IUser } from '../../../types'

const Profile = async ({ params }: { params: { userId: string } }) => {
  const username = params.userId.replace('%40', '')
  const user: IUser = await GET(
    `http://localhost:5000/users/username/${username}`
  )

  if (!user) console.log({ message: 'No user found' })

  return (
    <section className={page.section}>
      <div className={page.container}>
        <main className={page.main}>
          <img src={user.image} alt='' />
          <div className={page.user_data}>
            <div className={page.user_name}>
              <h1>
                {user.name} (@{user.username})
              </h1>
            </div>
            <div className={page.user_bio}>
              <p>{user.bio}</p>
            </div>
            <div className={page.user_info}>
              <div>
                <RiCake2Line className='icon' /> {returnDate(user)}
              </div>
              <div>
                <RiMapPinUserLine className='icon' /> {user.country}
              </div>
              <div>
                <RiEyeLine className='icon' /> 23M content views
              </div>
              <div>
                <RiFileList3Line className='icon' /> 176 articles
              </div>
            </div>
            <div className={page.user_link}>
              <RiLink className='icon' />
              <a href={user.link} target='_blank'>
                {user.link}
              </a>
            </div>
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

export default Profile
