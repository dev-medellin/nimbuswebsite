"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const sections = [
  ["Creating your account", "Registration creates an account for Nimbus Conquer. Provide an email address you control and accurate registration details. Do not impersonate another person, use misleading account details, or create accounts to evade restrictions. Register only if you can agree to these terms under the rules that apply where you live; obtain a parent or guardian’s permission where required."],
  ["Keeping your account secure", "Use a unique password and keep your login details private. Do not share, sell, buy, or transfer accounts. Tell the Nimbus team if you suspect unauthorized access. Staff will never need your password to investigate a report."],
  ["Fair play and community conduct", "Follow the published server rules and treat players and staff respectfully. Cheating, unauthorized bots or automation, exploiting bugs, scams, harassment, threats, impersonation, and real-money trading between players are prohibited. Report bugs instead of using them for an advantage."],
  ["Registration checks and account information", "Your username, email address, password, and account details are processed to create and operate your account. Registration uses Google reCAPTCHA to help prevent automated abuse and requires a successful verification. Google’s Privacy Policy and Terms of Service apply to its service. These registration terms do not replace a privacy notice."],
  ["Access and enforcement", "The Nimbus team may investigate suspected abuse and restrict or suspend accounts that violate these terms or the server rules. If you believe a restriction is a mistake, contact the team through the website’s official community support channel. Do not send passwords or other login secrets in a support request."],
  ["Availability and game changes", "The website and game may be unavailable during maintenance, updates, or technical problems. Features and game balance may change. Creating an account does not guarantee uninterrupted access, a particular game result, or that every feature will remain unchanged."],
  ["Registration and purchases", "Account registration is free and does not require a purchase. Any optional purchase is subject to the information and terms presented for that purchase. These registration terms do not remove rights or remedies that applicable law gives you."],
  ["Questions and acceptance", "Read the server rules before playing and contact the Nimbus team through its official community channel if you have questions. By selecting “I agree”, you confirm that you have read and accept these registration terms. You must also pass verification before submitting your registration."],
];

export default function RegistrationTerms({ open, onClose, onAccept }: {
  open: boolean; onClose: () => void; onAccept: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);

  return <dialog ref={dialog} aria-labelledby="registration-terms-title" onCancel={(event) => { event.preventDefault(); onClose(); }} className="m-auto w-[calc(100%_-_2rem)] max-w-2xl max-h-[90dvh] overflow-hidden border-2 border-[#b28a4e] bg-[#f2e4bd] p-0 text-[#29251d] shadow-2xl backdrop:bg-[#07111d]/85">
    <div className="flex max-h-[90dvh] flex-col">
      <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#b28a4e] bg-[#172a43] p-5 text-[#fff8e9]">
        <div><p className="text-xs uppercase tracking-widest text-[#e2b955]">Nimbus Conquer registration</p><h2 id="registration-terms-title" className="mt-2 font-fantasy text-2xl">Terms and conditions</h2></div>
        <button autoFocus type="button" aria-label="Close terms and conditions" onClick={onClose} className="rounded p-2 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e2b955]"><X size={22} /></button>
      </div>
      <div tabIndex={0} aria-label="Registration terms" className="min-h-0 overflow-y-auto p-5 text-sm leading-6 sm:p-7">
        <p className="mb-5">Please review these terms before creating your account.</p>
        {sections.map(([title, body], index) => <section key={title} className="mb-5"><h3 className="mb-2 font-bold text-[#263652]">{index + 1}. {title}</h3><p>{body}</p></section>)}
        <p className="flex flex-wrap gap-x-5 gap-y-2 text-[#8a342e]"><a href="/wiki/game-rules/game-rules/" target="_blank" rel="noopener noreferrer" className="underline">Server rules</a><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Google Privacy Policy</a><a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline">Google Terms of Service</a></p>
      </div>
      <div className="flex shrink-0 justify-end gap-3 border-t border-[#b28a4e] bg-[#e6d3a5] p-4">
        <button type="button" onClick={onClose} className="border border-[#b28a4e] px-4 py-3 text-sm font-bold">Close</button>
        <button type="button" onClick={onAccept} className="border border-[#f1d58a] bg-[#7c2435] px-5 py-3 text-sm font-bold text-white">I agree</button>
      </div>
    </div>
  </dialog>;
}
