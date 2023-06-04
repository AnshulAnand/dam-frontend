'use client'

import useSWR from 'swr'

async function fetcher(url: string) {
  const res = await fetch(url, { credentials: 'include' })
  if (!res.ok) {
    const error: any = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}

export default function useCurrentUser() {
  const { data, error, isLoading } = useSWR(
    'http://localhost:5000/users/current',
    fetcher
  )
  return { user: data, isLoading, isError: error }
}
