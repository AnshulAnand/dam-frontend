import Link from 'next/link'
import { RiGoogleLine } from 'react-icons/ri'

const SignIn = () => {
  return (
    <main>
      <h1>Login into your Account</h1>
      <h3>And continue writing and engaging with the community</h3>
      <form>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' />
        <button>Log in</button>
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
