'use client'

import useSWRMutation from 'swr/mutation'
import Link from 'next/link'
import { useState } from 'react'
import { RiGoogleLine } from 'react-icons/ri'

async function login(url, { arg }: { arg: { user: any }}) {
  return fetch(url, {
    method: 'POST',
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg.user)
  }).then(res => res.json())
}

const SignIn = () => {
  const { trigger, isMutating, data, error } = useSWRMutation('http://localhost:5000/users/login', login, /* options */)
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser(user => ({...user, [name]: value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await trigger({ user }, /* options */)
      console.log({ data })
      console.log({ result })
    } catch (e) {
      // error handling
      console.log(e)
    }
  }

  return (
    <main>
      <h1>Login into your Account</h1>
      <h3>And continue writing and engaging with the community</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name="username" value={user.username || ''} onChange={handleChange} />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name="email" value={user.email || ''} onChange={handleChange} />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name="password" value={user.password || ''} onChange={handleChange} />
        <button type="submit">Log in</button>
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
        Do not have an account? <Link href='/sign-up'>Create account here</Link>
      </div>
    </main>
  )
}

export default SignIn
