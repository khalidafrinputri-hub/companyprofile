import { createClient } from "@/lib/supabase/server";

// Kolom relasi ke app_users yang ikut diambil di setiap query
const FAVORITE_SELECT = "*, app_users(id, name, email, company_name)";

export async function findAllFavorites() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select(FAVORITE_SELECT);
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", id) // ← user_id
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .insert(payload)
    .select(FAVORITE_SELECT) // hasil insert ikut membawa data app_users
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteFavoriteById(id) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", id); // ← user_id
  if (error) throw new Error(error.message);
  return true;
}