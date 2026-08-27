"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "../../components/Navigation";

const schema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string(),
  referral: z.string().optional(),
  rules: z.literal(true),
}).refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Passwords must match." });
type RegisterValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({ resolver: zodResolver(schema) });
  const field = "mt-2 w-full border-2 border-[#b28a4e] bg-[#fff8e6] px-4 py-3 text-[#263652] outline-none transition placeholder:text-[#9a8d74] focus:border-[#8a342e] focus:ring-2 focus:ring-[#8a342e]/20";
  return (
    <div className="min-h-screen bg-[#101827] text-[#29251d]">
      <Navigation />
      <main className="relative overflow-hidden border-b-4 border-[#7d5427] bg-[#172a43] px-6 pb-20 pt-32 sm:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,#8b283c44,transparent_32%),linear-gradient(135deg,#1e2b46,#101827)]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#e1bd68]">Begin your chronicle</p>
            <h1 className="mt-4 font-fantasy text-5xl leading-tight text-[#fff8e9] sm:text-6xl">Create your<br /><span className="text-[#e2b955]">legend.</span></h1>
            <p className="mx-auto mt-5 max-w-md leading-7 text-[#cbd2dc] lg:mx-0">Join a European community built around the classic Conquer Online experience.</p>
            <div className="relative mx-auto mt-8 h-56 max-w-sm lg:mx-0"><Image src="/assets/Warrior.png" alt="Nimbus warrior" fill sizes="400px" className="object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,.5)]" /></div>
          </div>
          <div className="border-4 border-[#b28a4e] bg-[#e6d3a5] p-2 shadow-[7px_7px_0_#0b111c]">
            <div className="border border-[#d0a95b] bg-[#f2e4bd] p-6 sm:p-9">
              <div className="flex items-center gap-3 border-b-2 border-[#b28a4e] pb-5"><span className="grid size-11 place-items-center bg-[#263652] text-[#e2b955]"><ShieldCheck size={22} /></span><div><h2 className="font-fantasy text-2xl text-[#263652]">Join the realm</h2><p className="text-xs uppercase tracking-wider text-[#806c4d]">Registration is free</p></div></div>
              <form className="mt-6 grid gap-4" onSubmit={handleSubmit(() => setMessage("Your account is ready. Welcome to Nimbus."))}>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Username<input className={field} {...register("username")} placeholder="Choose your character name" />{errors.username && <small className="mt-1 block text-[#8a342e]">Username must be 3+ characters.</small>}</label>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Email<input className={field} {...register("email")} type="email" placeholder="you@example.com" />{errors.email && <small className="mt-1 block text-[#8a342e]">Enter a valid email address.</small>}</label>
                <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Password<input className={field} {...register("password")} type="password" placeholder="8+ characters" />{errors.password && <small className="mt-1 block text-[#8a342e]">Password must be 8+ characters.</small>}</label><label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Confirm password<input className={field} {...register("confirm")} type="password" placeholder="Repeat password" />{errors.confirm && <small className="mt-1 block text-[#8a342e]">{errors.confirm.message}</small>}</label></div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Referral code <span className="font-normal normal-case">(optional)</span><input className={field} {...register("referral")} /></label>
                <label className="flex items-start gap-3 text-sm leading-5 text-[#5e5545]"><input className="mt-1 size-4 accent-[#8a342e]" {...register("rules")} type="checkbox" /> <span>I agree to the rules of Nimbus Conquer.</span></label>
                {errors.rules && <small className="text-[#8a342e]">You must accept the rules.</small>}
                <button className="inline-flex items-center justify-center gap-3 border-2 border-[#f1d58a] bg-gradient-to-b from-[#c8474e] to-[#7c2435] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-[inset_0_1px_0_#ffffff66,0_4px_0_#4c1c2c] transition hover:-translate-y-0.5 hover:brightness-110" type="submit">Register now <ArrowRight size={15} /></button>
                {message && <p role="status" className="flex items-center gap-2 text-sm font-semibold text-[#386b46]"><Check size={16} />{message}</p>}
                <p className="text-center text-sm text-[#6d614c]">Already have an account? <Link className="font-bold text-[#8a342e] hover:underline" href="/login">Enter the portal</Link></p>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
