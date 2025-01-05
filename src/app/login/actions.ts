'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

interface SuccessResonse {
  status: 'success'
}

interface ErrorResponse {
  status: 'error'
  error: string
}

type Response = SuccessResonse | ErrorResponse;

export async function sendMagicLink(formData: FormData): Promise<Response> {
  const supabase = await createClient()

  const email = formData.get('email') as string

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Set this to whatever page you want the user to be redirected to after clicking the magic link
      shouldCreateUser: false,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`
    }
  })

  if (error) {
    return {
      status: 'error',
      error: error.message,
    }
  }

  return {
    status: 'success',
  }
}

export const submit = async (formData: FormData): Promise<void | string> => {
  const response = await sendMagicLink(formData)
  if (response.status === 'success') {
    redirect('/login/check-email')
  } else {
    return response.error
  }
}
