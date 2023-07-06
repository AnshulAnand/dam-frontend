'use client'

import { useSubscribe } from '@/lib/article'
import { RiMailSendLine } from 'react-icons/ri'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { triggerSubscribe, subscribeError } = useSubscribe()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerSubscribe({ body: { email } })
      toast.success(result.message)
    } catch (e) {
      console.log(e)
      toast.error('An error occurred')
    }
  }

  return (
    <div className='form-container-inner'>
      <h6 className='title newsletter-title'>Subscribe to DAM Newsletter</h6>
      <p className='newsletter-description'>
        Get handpicked artciles, written by the community, every weekend in an
        e-mail
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type='email'
          className='form-input'
          placeholder='Enter your email address'
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className='btn form-btn' type='submit'>
          <RiMailSendLine className='icon' />
        </button>
      </form>
    </div>
  )
}
