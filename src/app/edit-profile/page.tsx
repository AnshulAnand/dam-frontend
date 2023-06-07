'use client'

import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import page from './page.module.css'
import { IUser, IUserInput } from '../../../types'

async function getCurrentUser() {
  const res = await fetch('http://localhost:5000/users/current', {
    credentials: 'include',
  })
  return res.json()
}

async function updateProfile(url: string, { arg }: { arg: { user: any } }) {
  return fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg.user),
  }).then(res => res.json())
}

export default async function EditProfile() {
  const [user, setUser] = useState<IUserInput>({
    name: '',
    username: '',
    country: '',
    bio: '',
    link: '',
    image: '',
  })

  const currentUser: IUser = await getCurrentUser()

  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/users',
    updateProfile /* options */
  )

  if (error) console.log(error)

  const handleChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    setUser(user => ({ ...user, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await trigger({ user } /* options */)
      console.log({ data })
      console.log({ result })
    } catch (e) {
      // error handling
      console.log(e)
    }
  }
  return (
    <section className={page.section}>
      <img src='' />
      <form onSubmit={handleSubmit} className={page.form}>
        <label htmlFor='image'>Profile Image</label>
        <input
          type='text'
          id='image'
          name='image'
          value={user.image || ''}
          onChange={handleChange}
          placeholder='Image URL'
        />
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={user.name || ''}
          onChange={handleChange}
          placeholder='Your name'
        />
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          value={user.username || ''}
          onChange={handleChange}
          placeholder='Your username'
        />
        <label htmlFor='bio'>Bio</label>
        <textarea
          id='bio'
          name='bio'
          value={user.bio}
          onChange={handleChange}
          placeholder='Write your bio...'
        />
        <label htmlFor='country'>Country</label>
        <input
          type='text'
          id='country'
          name='country'
          value={user.country || ''}
          onChange={handleChange}
          placeholder='Your residing country'
        />
        <label htmlFor='link'>Website (or any other link)</label>
        <input
          type='text'
          id='link'
          name='link'
          value={user.link || ''}
          onChange={handleChange}
          placeholder='Your website link'
        />
        <button className={page.submit_btn} type='submit' disabled={isMutating}>
          Update Profile
        </button>
      </form>
    </section>
  )
}
