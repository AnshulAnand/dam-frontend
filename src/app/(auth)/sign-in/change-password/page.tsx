'use client'

import { useState } from 'react'
import useCurrentUser, { useChangePassword } from '@/lib/user'
import { toast } from 'react-hot-toast'

export default function ChangePassword() {
  const { currentUser } = useCurrentUser()

  if (currentUser) {
    location.assign(window.location.origin)
  }

  const {
    triggerChangePassword,
    changePasswordError,
    isChangePasswordMutating,
  } = useChangePassword()

  const [user, setUser] = useState({
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
      const result = await triggerChangePassword({ body: user } /* options */)
      location.assign(window.location.origin)
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not sign in')
    }
  }

  return (
    <main>
      <h1>Enter new password</h1>
      <h3>Your session will expire in 2 minutes</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='password'>New Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={user.password || ''}
          onChange={handleChange}
          required
        />
        <button type='submit' disabled={isChangePasswordMutating}>
          Submit
        </button>
      </form>
    </main>
  )
}
