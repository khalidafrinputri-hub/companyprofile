"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useFavorite } from "@/context/FavoriteContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/users", label: "Users" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/messages", label: "Messages" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const { favorites } = useFavorite();

  const favoriteCount = favorites?.length ?? 0;

  // Menu Favorite selalu tampil, jumlahnya hanya muncul kalau ada isinya
  const navLinks = [
    ...links,
    {
      href: "/favorites",
      label: favoriteCount > 0 ? `Favorite (${favoriteCount})` : "Favorite",
    },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-5xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-background/70 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
        {/* Brand Logo */}
        <Link
          href="/"
          className="shrink-0 text-sm font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          MyWebsite
        </Link>

        {/* Links Navigasi Utama (tampil di tablet/desktop) */}
        <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors hover:text-foreground",
                  isActive && "bg-foreground/10 font-medium text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Tombol Login / Logout (di luar 'hidden' supaya selalu tampil) */}
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className={cn(
                  buttonVariants({ size: "sm", variant: "outline" }),
                  "cursor-pointer rounded-full"
                )}
              >
                Logout
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}