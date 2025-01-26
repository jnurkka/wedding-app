import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { SaveTheDate } from "./pages";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <SaveTheDate />;
}
