"use client";
import { useState } from "react";
export default function CounterPage() {
  const [name, setName] = useState("");
  
  return (
    <main>
      <h1>Counter</h1>
      <p>Jumlah: {count}</p>
      <div className="flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama"
        />
       </div>

    </main>
  );
}