"use client";
import { useEffect, useState } from "react";
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  return (
    <main>
      <h1>Users</h1>
      {users.map((user) => (
        <p key={user.id}> {user.name} </p>
      ))}
    </main>
  );
}