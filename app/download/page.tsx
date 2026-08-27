import Image from "next/image";
import Link from "next/link";
import { Check, Download as DownloadIcon, FileArchive, Laptop, ShieldCheck } from "lucide-react";
import { PageIntro, Panel, SiteShell } from "../../components/SiteShell";

export default function DownloadPage() {
  return (
    <SiteShell>
      <PageIntro eyebrow="Prepare your expedition" title="Download the client.">Everything you need to enter the classic world.</PageIntro>
      <main className="relative overflow-hidden bg-[#e6d3a5] px-6 py-14 sm:px-10">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_70%_20%,#b58c4c33,transparent_55%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1.25fr_.75fr]">
          <section className="border-4 border-[#b28a4e] bg-[#f2e4bd] p-2 shadow-[6px_6px_0_#9b6d35]">
            <div className="border border-[#d0a95b] p-7 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-[#b28a4e] pb-6"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8a342e]">Official release</p><h2 className="mt-2 font-fantasy text-3xl text-[#263652]">Nimbus Conquer 1.0.8</h2><p className="mt-2 text-sm text-[#6d614c]">The complete classic client for Windows.</p></div><span className="grid size-14 place-items-center border-2 border-[#b28a4e] bg-[#263652] text-[#e2b955]"><FileArchive size={26} /></span></div>
              <div className="mt-7 grid gap-4 sm:grid-cols-3">{[["1.24 GB", "Download size"], ["Windows 7+", "Compatible"], ["18 Aug 2026", "Last updated"]].map(([value, label]) => <div key={label}><strong className="block font-fantasy text-lg text-[#263652]">{value}</strong><span className="text-[10px] uppercase tracking-wider text-[#806c4d]">{label}</span></div>)}</div>
              <a href="#requirements" className="mt-8 inline-flex items-center gap-3 border-2 border-[#f1d58a] bg-gradient-to-b from-[#c8474e] to-[#7c2435] px-7 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-[inset_0_1px_0_#ffffff66,0_4px_0_#4c1c2c] transition hover:-translate-y-0.5 hover:brightness-110"><DownloadIcon size={16} /> Download full client</a>
              <p className="mt-4 text-xs text-[#806c4d]">SHA-256: checksum will be published with the release.</p>
            </div>
          </section>
          <div className="border-4 border-[#314968] bg-[#263b57] p-7 text-[#f2e4bd] shadow-[6px_6px_0_#111b2c] sm:p-8"><Laptop className="size-9 text-[#e2b955]" /><h2 className="mt-5 font-fantasy text-2xl">Before you begin</h2><ul className="mt-6 space-y-4 text-sm leading-6 text-[#ccd4df]"><li className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-[#e2b955]" />Create your account first.</li><li className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-[#e2b955]" />Install to a folder outside Program Files.</li><li className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-[#e2b955]" />Run the launcher as administrator once.</li></ul><Link href="/register" className="mt-8 inline-flex border border-[#e2b955] px-5 py-3 text-xs font-bold uppercase tracking-widest text-[#f0d38b] transition hover:bg-[#7d2638]">Create account →</Link></div>
          <section id="requirements" className="border-2 border-[#b28a4e] bg-[#f2e4bd] p-7 shadow-[3px_3px_0_#b28a4e]"><div className="flex items-center gap-3"><ShieldCheck className="text-[#8a342e]" /><h2 className="font-fantasy text-2xl text-[#263652]">System requirements</h2></div><div className="mt-6 grid gap-6 text-sm text-[#6d614c] sm:grid-cols-2"><div><h3 className="font-bold uppercase tracking-wider text-[#8a342e]">Minimum</h3><p className="mt-2">Windows 7 · 2 GB RAM<br />DirectX 9 GPU · 5 GB storage</p></div><div><h3 className="font-bold uppercase tracking-wider text-[#8a342e]">Recommended</h3><p className="mt-2">Windows 10+ · 4 GB RAM<br />Broadband connection</p></div></div></section>
          <section className="border-2 border-[#b28a4e] bg-[#f2e4bd] p-7 shadow-[3px_3px_0_#b28a4e]"><h2 className="font-fantasy text-2xl text-[#263652]">Installation steps</h2><ol className="mt-5 space-y-4 text-sm text-[#6d614c]"><li><b className="mr-2 text-[#8a342e]">01</b> Download and extract the client.</li><li><b className="mr-2 text-[#8a342e]">02</b> Open <strong>NimbusLauncher.exe</strong>.</li><li><b className="mr-2 text-[#8a342e]">03</b> Let the launcher finish patching.</li><li><b className="mr-2 text-[#8a342e]">04</b> Enter the realm and begin your legend.</li></ol></section>
        </div>
      </main>
    </SiteShell>
  );
}
