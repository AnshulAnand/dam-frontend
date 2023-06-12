'use client'

import { useSubscribe } from '@/lib/article'
import { RiMailSendLine } from 'react-icons/ri'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { triggerSubscribe, subscribeError } = useSubscribe()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await triggerSubscribe({ body: { email } })
    } catch (e) {
      console.log(e)
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
          type='text'
          className='form-input'
          placeholder='Enter your email address'
          onChange={e => setEmail(e.target.value)}
        />
        <button className='btn form-btn' type='submit'>
          <RiMailSendLine className='icon' />
        </button>
      </form>
    </div>
  )
}
