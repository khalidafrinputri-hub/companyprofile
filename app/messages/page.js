import { messages } from "@/lib/db";
import { deleteMessageAction } from "./actions";

export default function MessagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>
      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Belum ada pesan masuk.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">{msg.name} - {msg.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">{msg.message}</p>
              </div>

              {/* Menambahkan tombol Hapus pada setiap pesan yang memanggil Server Action */}
              <form action={deleteMessageAction.bind(null, msg.id)}>
                <button 
                  type="submit" 
                  className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                >
                  Hapus
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
}