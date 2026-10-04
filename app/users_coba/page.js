"use client";
import { useEffect, useState } from "react";
import UsersLayout from "../tailwind"; // Import komponen layout dari app/tailwind.js

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <p className="p-8 text-red-500">Error: {error}</p>;
  }
  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  // Kirimkan data users ke UsersLayout di tailwind.js
  return <UsersLayout users={users} />;
}