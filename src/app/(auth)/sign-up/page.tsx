'use client'

import useCurrentUser, { useRegisterUser } from '@/lib/user'
import Link from 'next/link'
import { RiGoogleLine } from 'react-icons/ri'
import { useState } from 'react'

export default function SignUp() {
  const { currentUser } = useCurrentUser()

  if (currentUser) {
    location.assign(window.location.origin)
  }

  const { triggerRegisterUser, registerUserError } = useRegisterUser()

  const [user, setUser] = useState({
    name: '',
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
      const result = await triggerRegisterUser({ body: user } /* options */)
      location.assign(window.location.origin)
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  return (
    <main>
      <h1>Create Account</h1>
      <h3>And start writing and engaging with the community</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={user.name || ''}
          onChange={handleChange}
        />
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          value={user.username || ''}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={user.email || ''}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={user.password || ''}
          onChange={handleChange}
        />
        <button type='submit'>Create Account</button>
      </form>
      <div className='separator'>
        <div className='lines'></div>
        <span>Or</span>
        <div className='lines'></div>
      </div>
      <a href='/' className='google'>
        Sign-up with
        <RiGoogleLine className='icon' style={{ color: 'red' }} />
      </a>
      <div className='login-link'>
        Already have an account? <Link href='/sign-in'>Login here</Link>
      </div>
    </main>
  )
}
