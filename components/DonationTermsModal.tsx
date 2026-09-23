"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DonationTermsModal({ open, onClose, onAccept }: {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const [readToEnd, setReadToEnd] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (open) {
      setReadToEnd(false);
      setAgreed(false);
      element.showModal();
      document.body.style.overflow = "hidden";
    } else if (element.open) {
      element.close();
      document.body.style.overflow = "";
    }
    return () => {
      if (element.open) element.close();
      document.body.style.overflow = "";
    };
  }, [open]);

  function checkReadProgress() {
    const element = content.current;
    if (element && element.scrollTop + element.clientHeight >= element.scrollHeight - 8) {
      setReadToEnd(true);
    }
  }

  return (
    <dialog ref={dialog} aria-labelledby="donation-terms-title" onCancel={(event) => { event.preventDefault(); onClose(); }} className="m-auto w-[calc(100%_-_2rem)] max-w-2xl max-h-[90dvh] overflow-hidden border-2 border-[#b28a4e] bg-[#f2e4bd] p-0 text-[#29251d] shadow-2xl backdrop:bg-[#07111d]/85">
      <div className="flex max-h-[90dvh] flex-col">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#b28a4e] bg-[#172a43] p-5 text-[#fff8e9]">
          <div><p className="text-xs uppercase tracking-widest text-[#e2b955]">Nimbus Conquer donation shop</p><h2 id="donation-terms-title" className="mt-2 font-fantasy text-2xl">Terms and agreement</h2></div>
          <button type="button" aria-label="Close donation terms" onClick={onClose} className="rounded p-2 hover:bg-white/10"><X size={22} /></button>
        </header>
        <div ref={content} onScroll={checkReadProgress} tabIndex={0} aria-label="Donation terms" className="min-h-0 overflow-y-auto p-5 text-sm leading-6 sm:p-7">
          <p className="mb-5 font-semibold">Please read these terms before continuing to PayPal.</p>
          <h3 className="mb-2 font-bold text-[#263652]">1. Voluntary support</h3>
          <p className="mb-5">Shop purchases are voluntary donations that support Nimbus Conquer development, hosting, and community services. You are not required to purchase anything to play the game.</p>
          <h3 className="mb-2 font-bold text-[#263652]">2. Delivery and account credit</h3>
          <p className="mb-5">After PayPal confirms the payment, the purchased item or donation credit is delivered to the authenticated Nimbus account associated with the order. Delivery may require the game client to reconnect or the account to be refreshed.</p>
          <h3 className="mb-2 font-bold text-[#263652]">3. Accurate information</h3>
          <p className="mb-5">Check your account and item selection carefully before paying. We cannot guarantee delivery to the wrong account caused by incorrect account details or unauthorized use of your account.</p>
          <h3 className="mb-2 font-bold text-[#263652]">4. Payments and refunds</h3>
          <p className="mb-5">Payments are processed securely by PayPal in USD. Do not submit duplicate payments while an order is processing. Once an item has been successfully claimed in-game, the transaction is final and no refund will be provided. Refund requests for unclaimed items are reviewed by the Nimbus team, subject to applicable law.</p>
          <h3 className="mb-2 font-bold text-[#263652]">5. Fair play and enforcement</h3>
          <p className="mb-5">Purchased items do not permit cheating, automation, exploiting bugs, account sharing, or other violations of the server rules. Items or accounts connected to abuse, fraud, chargebacks, or rule violations may be restricted or removed.</p>
          <h3 className="mb-2 font-bold text-[#263652]">6. Acceptance</h3>
          <p>By checking the box below and selecting “I agree,” you confirm that you have read and accepted these donation terms and the applicable server rules.</p>
        </div>
        <footer className="shrink-0 border-t border-[#b28a4e] bg-[#e6d3a5] p-4">
          <label className="flex items-start gap-3 text-sm leading-5 text-[#5e5545]"><input type="checkbox" className="mt-1 size-4 accent-[#8a342e]" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} disabled={!readToEnd} /><span>{readToEnd ? "I have read and agree to the donation terms." : "Scroll to the end of the terms to enable agreement."}</span></label>
          <div className="mt-4 flex justify-end gap-3"><button type="button" onClick={onClose} className="border border-[#b28a4e] px-4 py-3 text-sm font-bold">Cancel</button><button type="button" disabled={!readToEnd || !agreed} onClick={onAccept} className="border border-[#f1d58a] bg-[#7c2435] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50">I agree and continue</button></div>
        </footer>
      </div>
    </dialog>
  );
}
