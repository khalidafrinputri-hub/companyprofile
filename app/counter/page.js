"use client";
import { useState } from "react";
export default function CounterPage() {
  const [name, setName] = useState("");
  
  return (
    <main>
      <h1>Masukkan Nama Anda</h1>
     
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