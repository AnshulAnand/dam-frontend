'use client'

import Link from 'next/link'
import { useState } from 'react'
import { RiGoogleLine } from 'react-icons/ri'
import useCurrentUser, { useLoginUser } from '@/lib/user'
import getGoogleOAuthURL from '@/utils/getGoogleUrl'
import { toast } from 'react-hot-toast'

export default function SignIn() {
  const { currentUser } = useCurrentUser()

  if (currentUser) {
    location.assign(window.location.origin)
  }

  const { triggerLoginUser, loginUserError, isLoginUserMutating } =
    useLoginUser()

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setUser(user => ({ ...user, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerLoginUser({ body: user } /* options */)
      location.assign(window.location.origin)
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not sign in')
    }
  }

  return (
    <main>
      <h1>Login into your Account</h1>
      <h3>And continue writing and engaging with the community</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          value={user.username || ''}
          onChange={handleChange}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={user.email || ''}
          onChange={handleChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={user.password || ''}
          onChange={handleChange}
          required
        />
        <button type='submit' disabled={isLoginUserMutating}>
          Log in
        </button>
      </form>
      <div className='separator'>
        <div className='lines'></div>
        <span>Or</span>
        <div className='lines'></div>
      </div>
      <a href={getGoogleOAuthURL()} className='google'>
        Sign-up with
        <RiGoogleLine className='icon' style={{ color: 'red' }} />
      </a>
      <div className='login-link'>
        Do not have an account?
        <Link href='/sign-up'>Create account here</Link>
      </div>
    </main>
  )
}
