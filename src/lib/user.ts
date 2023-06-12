'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { GET, PATCH, POST } from '@/utils/fetch'

// LOGIN user
export function useLoginUser() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/users/login',
    POST /* options */
  )
  return {
    triggerLoginUser: trigger,
    loginUserError: error,
  }
}

// REGISTER user
export function useRegisterUser() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/users/register',
    POST /* options */
  )
  return {
    triggerRegisterUser: trigger,
    registerUserError: error,
  }
}

// GET current user
export default function useCurrentUser() {
  const { data, error, isLoading } = useSWR(
    'http://localhost:5000/users/current',
    GET
  )
  return { user: data, isLoading, isError: error }
}

// GET user by id
export function useUserById(id: string) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:5000/users/id/${id}`,
    GET
  )

  return {
    user: data,
    isLoading,
    isError: error,
  }
}

// UPDATE user
export function useUpdateUser() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    'http://localhost:5000/user',
    PATCH /* options */
  )
  return {
    triggerUpdateUser: trigger,
    updateUserError: error,
  }
}
