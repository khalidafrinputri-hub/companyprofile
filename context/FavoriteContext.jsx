"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([]);
      return;
    }

    fetch("/api/favorites")
      .then((res) => (res.ok ? res.json() : []))
      .then(setFavorites);
  }, [isLoggedIn]);

  function isFavorite(userId) {
    return favorites.some((f) => f.user_id === userId);
  }

  async function addFavorite(user) {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk menambahkan favorite.");
      return;
    }

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (res.ok) {
      const saved = await res.json();
      setFavorites((prev) => [...prev, saved]);
    } else {
      const err = await res.json().catch(() => ({}));
      console.error("Gagal add favorite:", res.status, err);
      alert(`Gagal menambahkan favorite: ${err.error ?? res.status}`);
    }
  }

  async function removeFavorite(userId) {
    const res = await fetch(`/api/favorites/${userId}`, { method: "DELETE" });

    if (res.ok) {
      setFavorites((prev) => prev.filter((f) => f.user_id !== userId));
    } else {
      const err = await res.json().catch(() => ({}));
      console.error("Gagal hapus favorite:", res.status, err);
      alert(`Gagal menghapus favorite: ${err.error ?? res.status}`);
    }
  }

  async function toggleFavorite(user) {
    if (isFavorite(user.id)) {
      await removeFavorite(user.id);
    } else {
      await addFavorite(user);
    }
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }
  return context;
}