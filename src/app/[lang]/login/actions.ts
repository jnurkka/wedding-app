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

export async function submit(email: string, password?: string): Promise<Response> {
  const supabase = await createClient();
  if (password !== undefined) {
    if (password === process.env.SHARED_SECRET) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Set this to whatever page you want the user to be redirected to after clicking the magic link
          shouldCreateUser: true,
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
    } else {
      return {
        status: "error",
        error: "wrong-password",
      };
    }
  }

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
