"use client";

import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["/", "Home"],
  ["/register", "Register"],
  ["/download", "Download"],
  ["/wiki", "Wiki"],
  ["/shop", "Shop"],
  ["/login", "Login"],
];

export function Brand() {
  return null;
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b-2 border-[#a87739] bg-[#101827f2] shadow-[0_3px_0_#e0b85e33,0_8px_25px_rgba(0,0,0,.28)] backdrop-blur-md">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[#e4c27366]" />
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-end px-6 sm:px-10">
        <nav className={`${open ? "absolute left-0 top-[82px] flex w-full flex-col border-b-2 border-[#a87739] bg-[#101827] p-5 shadow-xl" : "hidden"} ml-auto gap-1 md:static md:flex md:w-auto md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          {links.map(([href, label]) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={`relative rounded px-3 py-3 text-[10px] font-bold uppercase tracking-[.17em] transition after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-center after:bg-[#d8b866] after:transition-transform ${active ? "bg-[#7d2638]/25 text-[#f0d38b] after:scale-x-100" : "text-[#b6bfcd] after:scale-x-0 hover:bg-white/5 hover:text-white hover:after:scale-x-100"}`}
                href={href}
                key={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-4 flex items-center gap-3">
          <span className="hidden items-center gap-2 border-r border-[#d8b866]/30 pr-4 text-[9px] font-bold uppercase tracking-[.14em] text-[#72d79a] lg:flex"><span className="size-1.5 rounded-full bg-[#72d79a] shadow-[0_0_8px_#72d79a]" /> Realm online</span>
          <Link className="hidden items-center gap-2 border-2 border-[#d8b866] bg-gradient-to-b from-[#8f3040] to-[#641f31] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#fff3d0] shadow-[inset_0_1px_0_#ffffff44] transition hover:brightness-125 sm:flex" href="/register">
            Enter realm <ArrowUpRight size={13} />
          </Link>
          <button className="rounded border border-[#d8b866]/50 bg-[#0c1524] p-2 text-[#f0d38b] transition hover:bg-[#7d2638] md:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
