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
          <Link className="hidden items-center gap-2 border-2 border-[#5865F2] bg-gradient-to-b from-[#5865F2] to-[#4752c4] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_5px_14px_rgba(88,101,242,.35)] transition hover:brightness-110 sm:flex" href="/register">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
              <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.211.375-.445.864-.608 1.249-1.845-.276-3.681-.276-5.526 0-.164-.385-.398-.874-.611-1.249a.077.077 0 0 0-.078-.037A19.736 19.736 0 0 0 3.683 4.37a.07.07 0 0 0-.032.028C.533 9.046-.32 13.58.1 18.058a.082.082 0 0 0 .031.056c2.053 1.508 4.041 2.423 5.992 3.03a.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.225-1.994a.076.076 0 0 0-.041-.106c-.653-.248-1.274-.55-1.873-.892a.077.077 0 0 1-.007-.128c.125-.094.251-.192.373-.292a.074.074 0 0 1 .078-.01c3.928 1.794 8.18 1.794 12.061 0a.074.074 0 0 1 .078.01c.122.1.248.198.373.292a.077.077 0 0 1-.007.128c-.598.342-1.219.644-1.872.892a.076.076 0 0 0-.041.106c.352.7.763 1.364 1.225 1.994a.078.078 0 0 0 .084.028c1.95-.607 3.938-1.522 5.992-3.03a.082.082 0 0 0 .031-.056c.42-4.478-.834-9.012-3.551-13.661a.063.063 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.42 0-1.334.955-2.419 2.157-2.419 1.211 0 2.176 1.085 2.157 2.419 0 1.334-.946 2.42-2.157 2.42Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.334.955-2.419 2.157-2.419 1.21 0 2.175 1.085 2.156 2.419 0 1.334-.946 2.42-2.156 2.42Z" />
            </svg>
            Join Discord
            <ArrowUpRight size={13} />
          </Link>
          <button className="rounded border border-[#d8b866]/50 bg-[#0c1524] p-2 text-[#f0d38b] transition hover:bg-[#7d2638] md:hidden" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
