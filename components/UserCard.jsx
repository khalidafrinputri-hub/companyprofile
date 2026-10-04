"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorite } from "@/context/FavoriteContext";
import { Button } from "@/components/ui/button";

export default function UserCard({ user }) {
  // Ambil fungsi toggleFavorite dan isFavorite dari Context pake state
  const { toggleFavorite, isFavorite } = useFavorite();

  // Cek apakah user saat ini berada dalam daftar favorit
  const isFav = isFavorite(user.id);

  // Ambil inisial nama untuk avatar bundar (misal: "Leanne Graham" -> "LG")
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "US";

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-foreground/[0.03] p-5 shadow-sm transition-all hover:border-white/20">
      <div className="space-y-4">
        {/* Header Kartu: Inisial Avatar & Nama */}
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-foreground">
            {initials}
          </div>
          <h3 className="font-semibold text-foreground">{user?.name}</h3>
        </div>

        {/* Informasi Detail */}
        <div className="space-y-1 text-xs text-muted-foreground">
          <p>{user?.email}</p>
          {user?.address?.city && <p>{user.address.city}</p>}
          {user?.company?.name && <p>{user.company.name}</p>}
        </div>
      </div>

      {/* Tombol Aksi (View Profile & Toggle Favorite) */}
      <div className="mt-6 flex items-center gap-2">
        <Link href={`/users/${user?.id}`} className="flex-1">
          <Button
            variant="outline"
            className="w-full rounded-full border-white/20 bg-white/10 text-xs font-medium text-foreground hover:bg-white/20"
          >
            View Profile
          </Button>
        </Link>

        <Button
          onClick={() => toggleFavorite(user)}
          variant="outline"
          className={`flex items-center gap-1.5 rounded-full border-white/20 px-3 text-xs font-medium transition-colors ${
            isFav
              ? "bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20"
              : "bg-white/10 text-foreground hover:bg-white/20"
          }`}
        >
          <Heart
            className={`size-3.5 transition-colors ${
              isFav ? "fill-red-500 text-red-500" : "text-foreground"
            }`}
          />
          <span>{isFav ? "Favourite" : "Add Favourite"}</span>
        </Button>
      </div>
    </div>
  );
}
