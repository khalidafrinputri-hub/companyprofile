import { favorites } from "@/lib/db";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = favorites.findIndex((f) => String(f.id) === id);

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  favorites.splice(index, 1);
  return Response.json({ message: "Berhasil dihapus" });
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const index = favorites.findIndex((f) => String(f.id) === id);

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Body request tidak valid (bukan JSON)" },
      { status: 400 }
    );
  }

  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      { error: "Body request tidak boleh kosong" },
      { status: 400 }
    );
  }

  // Gabungkan data lama dengan field baru yang dikirim (misal: { "note": "..." })
  favorites[index] = { ...favorites[index], ...body };

  return Response.json(favorites[index]);
}
