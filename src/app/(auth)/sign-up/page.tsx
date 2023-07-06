'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { RiGoogleLine } from 'react-icons/ri'
import useCurrentUser, { useRegisterUser } from '@/lib/user'
import getGoogleOAuthURL from '@/utils/getGoogleUrl'
import { EMAIL_REGEX, PWD_REGEX, USER_REGEX } from '@/utils/regex'
import { toast } from 'react-hot-toast'

export default function SignUp() {
  const userRef = useRef<HTMLInputElement>(null)

  const { currentUser } = useCurrentUser()

  if (currentUser) {
    location.assign(window.location.origin)
  }

  const { triggerRegisterUser, registerUserError, isRegisterUserMutating } =
    useRegisterUser()

  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  })

  const [validName, setValidName] = useState(false)
  const [validUsername, setValidUsername] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPwd, setValidPwd] = useState(false)
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
    const result = USER_REGEX.test(user.name)
    console.log({ result, user })
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = USER_REGEX.test(user.username)
    console.log({ result, user })
    setValidUsername(result)
  }, [user])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validName) {
      toast.error('Invalid name (atleast 3 chars)')
      return
    } else if (!validUsername) {
      toast.error(
        'Invalid username (atleast 3 chars, only letters, numbers, "-" and "_")'
      )
      return
    } else if (!validEmail) {
      toast.error('Invalid email')
      return
    } else if (!validPwd) {
      toast.error(
        'Invalid password (atleast one lowercase, uppercase, digit and one special char, atleast 6 chars)'
      )
      return
    }
    try {
      const result = await triggerRegisterUser({ body: user } /* options */)
      location.assign(window.location.origin)
    } catch (e) {
      // error handling
      console.log(e)
      toast.error('Could not sign up')
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
          ref={userRef}
          value={user.name || ''}
          onChange={handleChange}
          required
        />
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
        <button type='submit' disabled={isRegisterUserMutating}>
          Create Account
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
        Already have an account? <Link href='/sign-in'>Login here</Link>
      </div>
    </main>
  )
}
