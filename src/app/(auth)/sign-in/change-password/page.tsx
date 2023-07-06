'use client'

import { useEffect, useRef, useState } from 'react'
import useCurrentUser, { useChangePassword } from '@/lib/user'
import { toast } from 'react-hot-toast'
import { EMAIL_REGEX, OTP_REGEX, PWD_REGEX } from '@/utils/regex'

export default function ChangePassword() {
  const userRef = useRef<HTMLInputElement>(null)

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
    email: '',
    password: '',
    otp: '',
  })

  const [validEmail, setValidEmail] = useState(false)
  const [validPwd, setValidPwd] = useState(false)
  const [validOtp, setValidOtp] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setUser(user => ({ ...user, [name]: value }))
  }

  useEffect(() => {
    userRef.current?.focus()
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(user.email)
    console.log({ result, user })
    setValidEmail(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(user.password)
    console.log({ result, user })
    setValidPwd(result)
  }, [user])

  useEffect(() => {
    const result = OTP_REGEX.test(user.otp)
    console.log({ result, user })
    setValidOtp(result)
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validEmail) {
      toast.error('Invalid email')
      return
    } else if (!validPwd) {
      toast.error(
        'Invalid password (atleast one lowercase, uppercase, digit, and one special character, atleast 6 chars long)'
      )
      return
    } else if (!validOtp) {
      toast.error('Invalid OTP')
      return
    }
    try {
      const result = await triggerChangePassword({ body: user })
      if (result && result.message) toast.success(result.message)
      location.assign(window.location.origin)
    } catch (e) {
      // error handling
      console.log({ e, changePasswordError })
      if (
        changePasswordError &&
        changePasswordError.info &&
        changePasswordError.message
      )
        toast.error(changePasswordError.info.message)
      else toast.error('An unexpected error occurred')
    }
  }

  return (
    <main>
      <h1>Enter new password</h1>
      <h3>Your session will expire in 2 minutes</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='otp'>Enter OTP</label>
        <input
          type='text'
          id='otp'
          name='otp'
          ref={userRef}
          value={user.otp || ''}
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
