import { Check, Download as DownloadIcon, FileArchive, Laptop, ShieldCheck } from "lucide-react";
import { PageIntro, SiteShell } from "../../components/SiteShell";

const clientDownloadUrl = "https://drive.google.com/file/d/1r8xNVamnLypuwwC2ar7mWnYcaonn4x6T/view?usp=drive_link";
const mediafireDownloadUrl = "https://www.mediafire.com/file/tmm8cqzsapb76yd/NimbusClient.rar/file";

export default function DownloadPage() {
  return <SiteShell>
    <PageIntro eyebrow="Prepare your expedition" title="Download the Nimbus client.">Get the official Windows client and prepare to enter the classic world.</PageIntro>
    <main className="relative overflow-hidden bg-[#e6d3a5] px-6 py-14 sm:px-10">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(circle_at_70%_20%,#b58c4c33,transparent_55%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-7 lg:grid-cols-[1.25fr_.75fr]">
        <section className="border-4 border-[#b28a4e] bg-[#f2e4bd] p-2 shadow-[6px_6px_0_#9b6d35]"><div className="border border-[#d0a95b] p-7 sm:p-10">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b-2 border-[#b28a4e] pb-6"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8a342e]">Official client</p><h2 className="mt-2 font-fantasy text-3xl text-[#263652]">Nimbus Conquer</h2><p className="mt-2 text-sm text-[#6d614c]">The complete classic client for Windows.</p></div><span className="grid size-14 place-items-center border-2 border-[#b28a4e] bg-[#263652] text-[#e2b955]"><FileArchive size={26} /></span></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">{[["Google Drive", "Download host"], ["Windows", "Supported platform"], ["Official release", "Source"]].map(([value, label]) => <div key={label}><strong className="block font-fantasy text-lg text-[#263652]">{value}</strong><span className="text-[10px] uppercase tracking-wider text-[#806c4d]">{label}</span></div>)}</div>
          <div className="mt-8 flex flex-wrap gap-3"><a href={clientDownloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 border-2 border-[#f1d58a] bg-gradient-to-b from-[#c8474e] to-[#7c2435] px-7 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-[inset_0_1px_0_#ffffff66,0_4px_0_#4c1c2c] transition hover:-translate-y-0.5 hover:brightness-110"><DownloadIcon size={16} /> Google Drive</a></div>
          <p className="mt-4 text-xs leading-5 text-[#806c4d]">Choose either mirror to download the Nimbus client. Both links open in a new tab.</p>
        </div></section>
        <div className="border-4 border-[#314968] bg-[#263b57] p-7 text-[#f2e4bd] shadow-[6px_6px_0_#111b2c] sm:p-8"><Laptop className="size-9 text-[#e2b955]" /><h2 className="mt-5 font-fantasy text-2xl">Before you begin</h2><ul className="mt-6 space-y-4 text-sm leading-6 text-[#ccd4df]"><li className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-[#e2b955]" />Create your Nimbus account first.</li><li className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-[#e2b955]" />Download and extract the client outside Program Files.</li><li className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-[#e2b955]" />Run the launcher as administrator once so it can update.</li><li className="flex gap-3"><Check className="mt-1 size-4 shrink-0 text-[#e2b955]" />Use only the official launcher included with the client.</li></ul></div>
        <section id="requirements" className="border-2 border-[#b28a4e] bg-[#f2e4bd] p-7 shadow-[3px_3px_0_#b28a4e]"><div className="flex items-center gap-3"><ShieldCheck className="text-[#8a342e]" /><h2 className="font-fantasy text-2xl text-[#263652]">System requirements</h2></div><div className="mt-6 grid gap-6 text-sm text-[#6d614c] sm:grid-cols-2"><div><h3 className="font-bold uppercase tracking-wider text-[#8a342e]">Minimum</h3><p className="mt-2">Windows 7 or newer · 2 GB RAM<br />DirectX 9-compatible graphics · 5 GB free storage</p></div><div><h3 className="font-bold uppercase tracking-wider text-[#8a342e]">Recommended</h3><p className="mt-2">Windows 10 or newer · 4 GB RAM<br />Stable broadband connection</p></div></div></section>
        <section className="border-2 border-[#b28a4e] bg-[#f2e4bd] p-7 shadow-[3px_3px_0_#b28a4e]"><h2 className="font-fantasy text-2xl text-[#263652]">Installation steps</h2><ol className="mt-5 space-y-4 text-sm text-[#6d614c]"><li><b className="mr-2 text-[#8a342e]">01</b> Download the client from Google Drive.</li><li><b className="mr-2 text-[#8a342e]">02</b> Extract all files to your chosen game folder.</li><li><b className="mr-2 text-[#8a342e]">03</b> Open <strong>NimbusLauncher.exe</strong>.</li><li><b className="mr-2 text-[#8a342e]">04</b> Let the launcher finish patching, then enter the realm.</li></ol></section>
      </div>
    </main>
  </SiteShell>;
}
