"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then(setFavorites);
  }, []);

  async function addFavorite(user) {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const saved = await res.json();
      setFavorites((prev) => [...prev, saved]);
    }
  }

  async function removeFavorite(userId) {
    const res = await fetch(`/api/favorites/${userId}`, { method: "DELETE" });

    if (res.ok) {
      setFavorites((prev) => prev.filter((f) => f.id !== userId));
    }
  }

  function isFavorite(userId) {
    return favorites.some((f) => f.id === userId);
  }

  // WAJIB tetap ada (jangan dikomen) — UserCard.jsx manggil toggleFavorite(user),
  // kalau ini dihapus/dikomen, klik tombol favorite di UserCard akan crash.
  function toggleFavorite(user) {
    if (isFavorite(user.id)) {
      removeFavorite(user.id);
    } else {
      addFavorite(user);
    }
  }

  // Baru: update field tertentu (misalnya menambah "note") lewat PATCH
  async function updateFavorite(userId, updates) {
    const res = await fetch(`/api/favorites/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    if (res.ok) {
      const updated = await res.json();
      setFavorites((prev) =>
        prev.map((f) => (f.id === userId ? updated : f))
      );
    }

    return res.ok;
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    updateFavorite,
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

/* ============================================================
   VERSI LAMA (localStorage) — disimpan sebagai referensi, TIDAK aktif.
   Ini dikomen karena isinya bentrok: sama-sama mendeklarasikan
   FavoriteProvider, useFavorite, dan FavoriteContext seperti di atas,
   jadi kalau dibiarkan aktif berbarengan akan bikin app crash
   (duplicate declaration).

"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteUsers");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Gagal membaca localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteUsers", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (user) => {
    setFavorites((prevFavorites) => {
      const isExist = prevFavorites.some((item) => item.id === user.id);
      if (isExist) {
        return prevFavorites.filter((item) => item.id !== user.id);
      }
      return [...prevFavorites, user];
    });
  };

  const isFavorite = (userId) => {
    return favorites.some((user) => user.id === userId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite harus digunakan di dalam FavoriteProvider");
  }
  return context;
}

============================================================ */
