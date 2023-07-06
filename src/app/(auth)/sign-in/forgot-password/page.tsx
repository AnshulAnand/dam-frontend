'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useCurrentUser, { useForgotPassword } from '@/lib/user'
import { toast } from 'react-hot-toast'

export default function ForgotPassword() {
  const { push } = useRouter()

  const { currentUser } = useCurrentUser()

  if (currentUser) {
    location.assign(window.location.origin)
  }

  const {
    triggerForgotPassword,
    forgotPasswordError,
    isForgotPasswordMutating,
  } = useForgotPassword()

  const [user, setUser] = useState({
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setUser(user => ({ ...user, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerForgotPassword({ body: user })
      if (result && result.message) toast.success(result.message)
      push('/sign-in/change-password')
    } catch (e) {
      // error handling
      console.log({ e, forgotPasswordError })
      if (
        forgotPasswordError &&
        forgotPasswordError.info &&
        forgotPasswordError.info.message
      )
        toast.error(forgotPasswordError.info.message)
      else toast.error('An unexpected error occurred')
    }
  }

  return (
    <main>
      <h1>Enter your email</h1>
      <h3>You will receive an email with a code</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={user.email || ''}
          onChange={handleChange}
          required
        />
        <button type='submit' disabled={isForgotPasswordMutating}>
          Submit
        </button>
      </form>
    </main>
  )
}
