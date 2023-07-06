'use client'

import Link from 'next/link'
import { RiGoogleLine } from 'react-icons/ri'
import { useEffect, useRef, useState } from 'react'
import useCurrentUser, { useLoginUser } from '@/lib/user'
import getGoogleOAuthURL from '@/utils/getGoogleUrl'
import { EMAIL_REGEX, PWD_REGEX } from '@/utils/regex'
import { toast } from 'react-hot-toast'

export default function SignIn() {
  const userRef = useRef<HTMLInputElement>(null)

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [validEmail, setValidEmail] = useState(false)
  const [validPwd, setValidPwd] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const { currentUser } = useCurrentUser()

  if (currentUser) {
    location.assign(window.location.origin)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setUser(user => ({ ...user, [name]: value }))
  }

  const { triggerLoginUser, loginUserError, isLoginUserMutating } =
    useLoginUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validEmail) {
      toast.error('Invalid email')
      return
    } else if (!validPwd) {
      toast.error(
        'Invalid password (atleast one lowercase, uppercase, digit and one special char, atleast 6 chars)'
      )
    }
    try {
      const result = await triggerLoginUser({ body: user } /* options */)
      if (loginUserError) {
        console.log({ loginUserError })
        toast.error('An error occurred')
      }
      location.assign(window.location.origin)
    } catch (e: any) {
      // error handling
      console.log({ e, loginUserError })
      toast.error('Could not sign in')
    }
  }

  return (
    <main>
      <h1>Login into your Account</h1>
      <h3>And continue writing and engaging with the community</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name='email'
          ref={userRef}
          value={user.email || ''}
          onChange={handleChange}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          aria-invalid={validEmail ? 'false' : 'true'}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={user.password || ''}
          onChange={handleChange}
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          aria-invalid={validPwd ? 'false' : 'true'}
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
      <div className='forgot-password'>
        Forgot password?
        <Link href='/sign-in/forgot-password'>Change here</Link>
      </div>
    </main>
  )
}
