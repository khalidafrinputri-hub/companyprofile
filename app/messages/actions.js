"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(id) {
  // 1. Cari posisi pesan berdasarkan id
  const index = messages.findIndex((msg) => msg.id === id);

  // 2. Jika pesan ditemukan, hapus dari array messages
  if (index !== -1) {
    messages.splice(index, 1);
  }

  // 3. Revalidate path agar halaman otomatis memperbarui data
  revalidatePath("/messages");
}