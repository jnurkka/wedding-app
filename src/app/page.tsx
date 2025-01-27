import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { SaveTheDate } from "./pages";

async function submitRegistration(registration: {
  joining: boolean;
  joining_fr: boolean;
  people: number;
  staying: boolean;
  staying_fr: boolean;
}) {
  "use server"; // mark function as a server action (fixes the error)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("registrations").upsert(
    {
      user_id: user.id,
      ...registration,
    },
    {
      onConflict: "user_id",
    },
  );

  if (error) {
    console.error("Error submitting registration:", error);
    throw error;
  }

  return "success";
}

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    redirect("/login");
  }

  const getRegistration = async () => {
    // Fetch existing registration
    const { data } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", userData.user.id);

    if (data && data.length > 0) {
      return data[0];
    }
    return null;
  };

  const registration = await getRegistration();

  return (
    <SaveTheDate
      registration={registration}
      submitRegistration={submitRegistration}
    />
  );
}
