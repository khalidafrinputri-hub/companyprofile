import { favorites } from "@/lib/db";

export async function GET() {
  return Response.json(favorites);
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "Body request tidak valid (bukan JSON)" },
      { status: 400 }
    );
  }

  // Cek body kosong (misalnya request dikirim tanpa body sama sekali)
  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      { error: "Body request tidak boleh kosong" },
      { status: 400 }
    );
  }

  // Kumpulkan semua field wajib yang kosong, bukan cuma cek satu-satu
  const missingFields = [];
  if (!body.id) missingFields.push("id");
  if (!body.name) missingFields.push("name");
  if (!body.email) missingFields.push("email");

  if (missingFields.length > 0) {
    return Response.json(
      { error: `Field berikut wajib diisi: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  const alreadyExists = favorites.some((f) => f.id === body.id);
  if (alreadyExists) {
    return Response.json(
      { error: "User ini sudah difavoritkan" },
      { status: 400 }
    );
  }

  favorites.push(body);
  return Response.json(body, { status: 201 });
}
