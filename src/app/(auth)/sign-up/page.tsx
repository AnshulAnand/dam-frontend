import Link from 'next/link'
import { RiGoogleLine } from 'react-icons/ri'

const SignUp = () => {
  return (
    <main>
      <h1>Create Account</h1>
      <h3>And start writing and engaging with the community</h3>
      <form>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' />
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' />
        <button>Create Account</button>
      </form>
      <div className='separator'>
        <div className='lines'></div>
        <span>Or</span>
        <div className='lines'></div>
      </div>
      <a href='/' className='google'>
        Sign-up with
        <RiGoogleLine className='icon' style={{color: 'red'}} />
      </a>
      <div className='login-link'>
        Already have an account? <Link href='/sign-in'>Login here</Link>
      </div>
    </main>
  )
}

export default SignUp
