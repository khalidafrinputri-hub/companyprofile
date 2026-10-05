import {
  findAllFavorites,
  findFavoriteById,
  insertFavorite,
  deleteFavoriteById,
} from "@/lib/repositories/favoriteRepository";
import { validateFavoriteInput } from "@/lib/validations/favoriteValidation";

export async function getAllFavorites() {
  return await findAllFavorites();
}

export async function addFavorite(body) {
  const validation = validateFavoriteInput(body);
  if (!validation.valid) {
    return { success: false, status: 400, error: validation.error };
  }

  const alreadyExists = await findFavoriteById(body.id);
  if (alreadyExists) {
    return { success: false, status: 400, error: "User ini sudah difavoritkan" };
  }

  // Supabase cuma punya kolom id, name, email, company_name — field lain
  // dari data user (address, phone, website, username, dst) harus dibuang
  // dulu, kalau tidak Supabase akan error "column not found".
  const favoriteData = {
    id: body.id,
    name: body.name,
    email: body.email,
    company_name: body.company?.name ?? null,
  };

  const saved = await insertFavorite(favoriteData);
  return { success: true, status: 201, data: saved };
}

export async function removeFavorite(id) {
  const deleted = await deleteFavoriteById(id);
  if (!deleted) {
    return { success: false, status: 404, error: "Data tidak ditemukan" };
  }

  return { success: true, status: 200 };
}
