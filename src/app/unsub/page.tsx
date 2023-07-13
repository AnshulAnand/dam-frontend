'use client'

import { DELETE } from '@/utils/fetch'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Page() {
  const [code, setCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await DELETE(`${process.env.NEXT_PUBLIC_API_URL}/newsletter`, {
      arg: { body: { id: code } },
    })
    toast.success(res.message)
  }

  return (
    <section
      style={{
        marginTop: '10rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
      >
        <label htmlFor='code'>Code received in email</label>
        <input
          id='code'
          type='text'
          name='code'
          placeholder='eg: 64993cca72af7fa1a1c0098e'
          onChange={e => setCode(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <button
          style={{
            cursor: 'pointer',
            padding: '1rem 2rem',
            backgroundColor: 'var(--secondary-background-color)',
          }}
        >
          Unsubscribe
        </button>
      </form>
    </section>
  )
}
