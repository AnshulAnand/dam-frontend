'use client'

import { useState } from 'react'
import page from './page.module.css'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import useCurrentUser, { useUpdateUser } from '@/lib/user'

export default function EditProfile() {
  const { push } = useRouter()
  const { currentUser, isLoading, isError } = useCurrentUser()

  const [profile, setProfile] = useState({
    name: currentUser?.name,
    username: currentUser?.username,
    country: currentUser?.country,
    bio: currentUser?.bio,
    link: currentUser?.link,
    image: currentUser?.image,
  })

  const { triggerUpdateUser, updateUserError } = useUpdateUser()

  const handleChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerUpdateUser({ body: profile })
      toast.success('Profile updated')
      push(`/@${result.username}`)
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not update profile')
    }
  }

  return (
    <section className={page.section}>
      {/* <img src={user.image} /> */}
      <form onSubmit={handleSubmit} className={page.form}>
        <label htmlFor='image'>Profile Image</label>
        <input
          type='text'
          id='image'
          name='image'
          value={profile.image || ''}
          onChange={handleChange}
          placeholder='Image URL'
        />
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={profile.name || ''}
          onChange={handleChange}
          placeholder='Your name'
        />
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          value={profile.username || ''}
          onChange={handleChange}
          placeholder='Your username'
        />
        <label htmlFor='bio'>Bio</label>
        <textarea
          id='bio'
          name='bio'
          value={profile.bio}
          onChange={handleChange}
          placeholder='Write your bio...'
        />
        <label htmlFor='country'>Country</label>
        <input
          type='text'
          id='country'
          name='country'
          value={profile.country || ''}
          onChange={handleChange}
          placeholder='Your residing country'
        />
        <label htmlFor='link'>Website (or any other link)</label>
        <input
          type='text'
          id='link'
          name='link'
          value={profile.link || ''}
          onChange={handleChange}
          placeholder='Your website link'
        />
        <button className={page.submit_btn} type='submit'>
          Update Profile
        </button>
      </form>
    </section>
  )
}
