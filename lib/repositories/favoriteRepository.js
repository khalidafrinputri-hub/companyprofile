import { supabase } from "@/lib/supabase";

export async function findAllFavorites() {
  const { data, error } = await supabase.from("favorites").select("*");
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(data) {
  const { data: saved, error } = await supabase
    .from("favorites")
    .insert(data)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return saved;
}

export async function deleteFavoriteById(id) {
  const { data, error } = await supabase
    .from("favorites")
    .delete()
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);
  return data.length > 0;
}
