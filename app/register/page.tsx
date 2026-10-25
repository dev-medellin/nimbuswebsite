"use client";

import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "../../components/Navigation";
import { PvpAuthTemplate } from "../../components/PvpTemplates";
import RegistrationTerms from "../../components/RegistrationTerms";
import RegistrationVerification from "../../components/RegistrationVerification";
import { isAuthenticated, registerUser } from "../../lib/api";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string(),
  referral: z.string().optional(),
  rules: z.boolean().refine((value) => value, { message: "You must accept the rules." }),
}).refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Passwords must match." });
type RegisterValues = z.infer<typeof schema>;

function RegistrationClosed() {
  return (
    <div className="pvp-auth-page min-h-screen bg-[#101827] text-[#fff8e9]">
      <Navigation />
      <main className="flex min-h-screen items-center justify-center px-6 pt-20 text-center">
        <div className="max-w-xl border-2 border-[#b28a4e] bg-[#172a43] p-8 shadow-[6px_6px_0_#0b111c] sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#e1bd68]">Registration temporarily closed</p>
          <h1 className="mt-4 font-fantasy text-4xl text-[#fff8e9] sm:text-5xl">The realm is still being forged.</h1>
          <p className="mt-5 leading-7 text-[#cbd2dc]">New registrations are unavailable while Nimbus Conquer is under maintenance. Please check back after launch or follow our Discord for updates.</p>
          <p className="mt-4 text-xs font-bold uppercase tracking-[.14em] text-[#d8b866]">Server opening September 12, 2026 · 6:00 PM CEST (Europe/Berlin)</p>
          <a className="mt-7 inline-flex items-center gap-3 border-2 border-[#f1d58a] bg-gradient-to-b from-[#5865F2] to-[#4752c4] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-[0_4px_0_#242a68] transition hover:-translate-y-0.5 hover:brightness-110" href="https://discord.gg/GahvDNZTB" target="_blank" rel="noopener noreferrer">Join us on Discord <ArrowRight size={15} /></a>
        </div>
      </main>
    </div>
  );
}

export default function RegisterPage() {
  const registrationDisabled = false;
  if (registrationDisabled) return <RegistrationClosed />;

  const [message, setMessage] = useState("");
  const [requestState, setRequestState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [termsOpened, setTermsOpened] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [recaptchaTicket, setRecaptchaTicket] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) router.replace("/");
  }, [router]);
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegisterValues>({ resolver: zodResolver(schema) });
  const agreed = watch("rules") === true;
  const submit = async (values: RegisterValues) => {
    if (!termsOpened || !values.rules || !recaptchaTicket) return;
    setMessage("");
    setRequestState("submitting");
    try {
      await registerUser(values.username, values.email, values.password, values.rules, recaptchaTicket);
      setRequestState("success");
      setMessage("Your account is ready. Welcome to Nimbus.");
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/");
    } catch (error) {
      setRecaptchaTicket("");
      setVerificationAttempt((value) => value + 1);
      setRequestState("error");
      setMessage(error instanceof Error ? error.message : "Registration failed.");
    }
  };
  const field = "mt-2 w-full border-2 border-[#b28a4e] bg-[#fff8e6] px-4 py-3 text-[#263652] outline-none transition placeholder:text-[#9a8d74] focus:border-[#8a342e] focus:ring-2 focus:ring-[#8a342e]/20";
  return (
    <>
      <PvpAuthTemplate eyebrow="New Challenger" title="Create your" accent="legend." description="Join a classic PvP community where progression is earned and every victory builds your reputation." image="/assets/Water.png" imageAlt="Nimbus Water Taoist" formSide="right">
              <div className="flex items-center gap-3 border-b-2 border-[#b28a4e] pb-5"><span className="grid size-11 place-items-center bg-[#263652] text-[#e2b955]"><ShieldCheck size={22} /></span><div><h2 className="font-fantasy text-2xl text-[#263652]">Join the realm</h2><p className="text-xs uppercase tracking-wider text-[#806c4d]">Registration is free</p></div></div>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit(submit)}>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Username<input className={field} {...register("username")} placeholder="Choose your character name" />{errors.username && <small className="mt-1 block text-[#8a342e]">Username must be 3+ characters.</small>}</label>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Email<input className={field} {...register("email")} type="email" placeholder="you@example.com" />{errors.email && <small className="mt-1 block text-[#8a342e]">Enter a valid email address.</small>}</label>
                <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Password<input className={field} {...register("password")} type="password" placeholder="8+ characters" />{errors.password && <small className="mt-1 block text-[#8a342e]">Password must be 8+ characters.</small>}</label><label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Confirm password<input className={field} {...register("confirm")} type="password" placeholder="Repeat password" />{errors.confirm && <small className="mt-1 block text-[#8a342e]">{errors.confirm.message}</small>}</label></div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Referral code <span className="font-normal normal-case">(optional)</span><input className={field} {...register("referral")} /></label>
                <p className="text-sm leading-5 text-[#6d614c]">Check the box to open and review the terms and conditions.</p>
                <label className="flex items-start gap-3 text-sm leading-5 text-[#5e5545]"><input className="mt-1 size-4 accent-[#8a342e]" {...register("rules")} checked={agreed} onChange={(event) => { if (event.target.checked && !termsOpened) { setTermsModalOpen(true); return; } setValue("rules", event.target.checked, { shouldValidate: true, shouldDirty: true }); }} type="checkbox" /> <span>I have read and agree to the terms and conditions of Nimbus Conquer.</span></label>
                {errors.rules && <small className="text-[#8a342e]">You must accept the rules.</small>}
                <RegistrationVerification enabled={termsOpened && agreed && !isSubmitting} attempt={verificationAttempt} onVerified={setRecaptchaTicket} />
                <button disabled={isSubmitting || !termsOpened || !agreed || !recaptchaTicket} className="inline-flex items-center justify-center gap-3 border-2 border-[#f1d58a] bg-gradient-to-b from-[#c8474e] to-[#7c2435] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-[inset_0_1px_0_#ffffff66,0_4px_0_#4c1c2c] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-60" type="submit">{isSubmitting ? "Creating account..." : "Register now"} <ArrowRight size={15} /></button>
                {message && <p role="status" className={`flex items-center gap-2 text-sm font-semibold ${requestState === "error" ? "text-[#8a342e]" : "text-[#386b46]"}`}>{requestState === "success" && <Check size={16} />}{message}</p>}
                <p className="text-center text-sm text-[#6d614c]">Already have an account? <Link className="font-bold text-[#8a342e] hover:underline" href="/login">Enter the portal</Link></p>
              </form>
      </PvpAuthTemplate>
      <RegistrationTerms open={termsModalOpen} onClose={() => setTermsModalOpen(false)} onAccept={() => { setTermsOpened(true); setValue("rules", true, { shouldValidate: true, shouldDirty: true }); setTermsModalOpen(false); }} />
    </>
  );
}
