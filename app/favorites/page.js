"use client";

import { useFavorite } from "@/context/FavoriteContext";
import UserCard from "@/components/UserCard";

export default function FavoritesPage() {
  const { favorites } = useFavorite();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">My Favorite Users</h1>
      <p className="mt-1 text-muted-foreground">
        Daftar ini diambil langsung dari FavoriteContext.
      </p>

      {favorites.length === 0 ? (
        <div className="mt-12 rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            Belum ada user yang ditambahkan ke favorit.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </main>
  );
}