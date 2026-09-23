"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { completePaypalReturn } from "../lib/api";

export default function PaypalSuccessContent() {
  const params = useSearchParams();
  const reference = params.get("reference") || "";
  const token = params.get("token") || "";
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Confirming your PayPal payment…");

  useEffect(() => {
    if (!reference || !token) {
      setState("error");
      setMessage("PayPal did not provide a complete payment return. Please check your PayPal activity before trying again.");
      return;
    }
    completePaypalReturn(reference, token)
      .then((result) => {
        setState("success");
        setMessage(result.message || "Your payment was confirmed successfully.");
      })
      .catch((error) => {
        setState("error");
        setMessage(error instanceof Error ? error.message : "We could not confirm this PayPal payment.");
      });
  }, [reference, token]);

  return <main className="flex min-h-screen items-center justify-center bg-[#08151d] px-6 py-16 text-[#f8e9bc]"><section className="w-full max-w-xl border-2 border-[#b28a4e] bg-[#142b39] p-8 text-center shadow-[8px_8px_0_#071017]"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#f4ca55]">PayPal payment</p><h1 className="mt-3 font-fantasy text-4xl">{state === "loading" ? "One moment" : state === "success" ? "Payment confirmed" : "Payment not confirmed"}</h1><p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#c8d0d8]">{message}</p>{state !== "loading" && <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/shop" className="bg-[#f4ca55] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#263652]">Return to shop</Link><Link href="/account" className="border border-[#b28a4e] px-5 py-3 text-xs font-bold uppercase tracking-[.12em] text-[#f8e9bc]">Open account</Link></div>}</section></main>;
}
