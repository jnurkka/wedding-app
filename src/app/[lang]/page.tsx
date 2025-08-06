import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { SaveTheDate } from "../pages";
import { Registration } from "../data";
import { getDictionary, Lang } from "./dictionaries";

async function submitRegistration(registration: Registration) {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  // Extract menu_selections from registration data
  const { menu_selections, ...registrationData } = registration;

  // Update registrations table (without menu_selections)
  const { error: registrationError } = await supabase.from("registrations").upsert(
    {
      user_id: user.id,
      ...registrationData,
    },
    {
      onConflict: "user_id",
    },
  );

  if (registrationError) {
    console.error("Error submitting registration:", registrationError);
    throw registrationError;
  }

  // Handle food orders if menu selections exist
  if (menu_selections && Object.keys(menu_selections).length > 0) {
    // First, delete existing food orders for this user
    const { error: deleteError } = await supabase
      .from("food_orders")
      .delete()
      .eq("user_id", user.id);

    if (deleteError) {
      console.error("Error deleting existing food orders:", deleteError);
      throw deleteError;
    }

    // Helper function to map menu selections to enum values
    const mapAppetizerToEnum = (appetizer: string | undefined): string | null => {
      switch (appetizer) {
        case 'finnish_salmon_soup':
          return 'fish';
        case 'vegetarian_soup':
          return 'vegetarian';
        default:
          return null;
      }
    };

    const mapMainToEnum = (main: string | undefined): string | null => {
      switch (main) {
        case 'braised_beef':
          return 'meat';
        case 'saibling_filet':
          return 'fish';
        case 'stuffed_schlutzkrapfen':
          return 'vegetarian';
        default:
          return null;
      }
    };

    // Insert new food orders
    const foodOrders = Object.entries(menu_selections).map(([index, selection]) => ({
      user_id: user.id,
      participant_index: parseInt(index),
      participant_name: selection.name || "",
      appetizer: mapAppetizerToEnum(selection.appetizer),
      main_course: mapMainToEnum(selection.main),
    }));

    const { error: foodOrderError } = await supabase
      .from("food_orders")
      .insert(foodOrders);

    if (foodOrderError) {
      console.error("Error submitting food orders:", foodOrderError);
      throw foodOrderError;
    }
  }

  return "success";
}

export default async function PrivatePage({
  params,
}: {
  params: Promise<{ lang: Lang }>;
}) {
  const lang = (await params).lang;
  const dictionary = await getDictionary(lang);
  const supabase = await createClient();

  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user || !userData.user.email) {
    redirect("/login");
  }

  const getRegistration = async () => {
    // Fetch existing registration
    const { data: registrationData } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", userData.user.id);

    if (!registrationData || registrationData.length === 0) {
      return null;
    }

    const registration = registrationData[0];

    // Fetch food orders for this user
    const { data: foodOrdersData } = await supabase
      .from("food_orders")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("participant_index");

    // Helper functions to map enum values back to frontend values
    const mapAppetizerFromEnum = (appetizer: string | null): string | undefined => {
      switch (appetizer) {
        case 'fish':
          return 'finnish_salmon_soup';
        case 'vegetarian':
          return 'vegetarian_soup';
        default:
          return undefined;
      }
    };

    const mapMainFromEnum = (main: string | null): string | undefined => {
      switch (main) {
        case 'meat':
          return 'braised_beef';
        case 'fish':
          return 'saibling_filet';
        case 'vegetarian':
          return 'stuffed_schlutzkrapfen';
        default:
          return undefined;
      }
    };

    // Convert food orders back to menu_selections format
    let menu_selections = undefined;
    if (foodOrdersData && foodOrdersData.length > 0) {
      menu_selections = {};
      foodOrdersData.forEach((order) => {
        menu_selections[order.participant_index] = {
          name: order.participant_name,
          appetizer: mapAppetizerFromEnum(order.appetizer),
          main: mapMainFromEnum(order.main_course),
        };
      });
    }

    return {
      ...registration,
      menu_selections,
    };
  };

  const registration = await getRegistration();

  return (
    <SaveTheDate
      registration={registration}
      submitRegistration={submitRegistration}
      email={userData.user.email}
      dict={dictionary}
      lang={lang}
    />
  );
}
