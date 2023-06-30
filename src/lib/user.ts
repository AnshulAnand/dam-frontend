'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { GET, PATCH, POST } from '@/utils/fetch'
import { IUser } from '@/types'

// LOGIN user
export function useLoginUser() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    POST /* options */
  )
  return {
    triggerLoginUser: trigger,
    loginUserError: error,
    isLoginUserMutating: isMutating,
  }
}

// REGISTER user
export function useRegisterUser() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
    POST /* options */
  )
  return {
    triggerRegisterUser: trigger,
    registerUserError: error,
    isRegisterUserMutating: isMutating,
  }
}

// LOGOUT user
export function useLogoutUser() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
    GET
  )
  return {
    data,
    isLoading,
    isError: error,
  }
}

// FORGOT password
export function useForgotPassword() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`,
    POST /* options */
  )
  return {
    triggerForgotPassword: trigger,
    forgotPasswordError: error,
    isForgotPasswordMutating: isMutating,
  }
}

// CHANGE password
export function useChangePassword() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
    POST /* options */
  )
  return {
    triggerChangePassword: trigger,
    changePasswordError: error,
    isChangePasswordMutating: isMutating,
  }
}

// GET current user
export default function useCurrentUser() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/users/current`,
    GET
  )
  return {
    currentUser: data as IUser,
    isLoading,
    isError: error,
  }
}

// GET user by id
export function useUserById(id: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`,
    GET
  )

  return {
    user: data as IUser,
    isLoading,
    isError: error,
  }
}

// GET user by username
export function useUserByUsername(username: string) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/users/username/${username}`,
    GET
  )

  return {
    user: data as IUser,
    isLoading,
    isError: error,
  }
}

// UPDATE user
export function useUpdateUser() {
  const { trigger, isMutating, data, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    PATCH /* options */
  )
  return {
    triggerUpdateUser: trigger,
    updateUserError: error,
    isUpdateUserMutating: isMutating,
  }
}
