"use server";

import { createClient } from "@/utils/supabase/server";

interface SuccessResonse {
  status: "success";
}

interface ErrorResponse {
  status: "error";
  error: string;
}

type Response = SuccessResonse | ErrorResponse;

export async function submit(email: string): Promise<Response> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Set this to whatever page you want the user to be redirected to after clicking the magic link
      shouldCreateUser: false,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`,
    },
  });

  if (error) {
    return {
      status: "error",
      error: error.message,
    };
  }

  return {
    status: "success",
  };
}
