"use client";

import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PvpAuthTemplate } from "../../components/PvpTemplates";
import { loginUser } from "../../lib/api";
import AccessUnavailable from "../../components/AccessUnavailable";

const schema = z.object({
  identity: z.string().min(1, "Enter your username or email."),
  password: z.string().min(1, "Enter your password."),
});
type LoginValues = z.infer<typeof schema>;

export default function LoginPage() {
  const loginDisabled = false;
  if (loginDisabled) return <AccessUnavailable title="Login is temporarily closed." message="The login portal is unavailable while Nimbus Conquer is being prepared. Please follow our Discord for launch updates." />;

  const [message, setMessage] = useState("");
  const [requestState, setRequestState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(schema) });
  const submit = async (values: LoginValues) => {
    setMessage("");
    setRequestState("submitting");
    try {
      await loginUser(values.identity, values.password);
      setRequestState("success");
      setMessage("Welcome back, adventurer.");
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/");
    } catch (error) {
      setRequestState("error");
      setMessage(error instanceof Error ? error.message : "Login failed.");
    }
  };
  const field = "mt-2 w-full border-2 border-[#b28a4e] bg-[#fff8e6] px-4 py-3 text-[#263652] outline-none transition placeholder:text-[#9a8d74] focus:border-[#8a342e] focus:ring-2 focus:ring-[#8a342e]/20";
  return (
    <PvpAuthTemplate eyebrow="Combatant Access" title="Return to your" accent="adventure." description="Your guild, your equipment, and your next victory are waiting in the classic PvP realm." image="/assets/Trojan.png" imageAlt="Nimbus Trojan warrior" formSide="left" footerNote={<><ShieldCheck size={15} /> Secure account portal</>}>
              <div className="flex items-center gap-3 border-b-2 border-[#b28a4e] pb-5"><span className="grid size-11 place-items-center bg-[#263652] text-[#e2b955]"><KeyRound size={22} /></span><div><h1 className="font-fantasy text-2xl text-[#263652]">Enter the realm</h1><p className="text-xs uppercase tracking-wider text-[#806c4d]">Welcome back, adventurer</p></div></div>
              <form className="mt-6 grid gap-5" onSubmit={handleSubmit(submit)}>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Username or email<input className={field} {...register("identity")} placeholder="Your account name" aria-invalid={Boolean(errors.identity)} />{errors.identity && <small className="mt-1 block text-[#8a342e]">{errors.identity.message}</small>}</label>
                <label className="text-xs font-bold uppercase tracking-wider text-[#5e5545]">Password<input className={field} type="password" {...register("password")} placeholder="Your secret key" aria-invalid={Boolean(errors.password)} />{errors.password && <small className="mt-1 block text-[#8a342e]">{errors.password.message}</small>}</label>
                <label className="flex items-center gap-3 text-sm text-[#5e5545]"><input className="size-4 accent-[#8a342e]" type="checkbox" /> Remember me</label>
                <button disabled={isSubmitting} className="inline-flex items-center justify-center gap-3 border-2 border-[#f1d58a] bg-gradient-to-b from-[#c8474e] to-[#7c2435] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white shadow-[inset_0_1px_0_#ffffff66,0_4px_0_#4c1c2c] transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-60" type="submit">{isSubmitting ? "Opening portal..." : "Enter the world"} <ArrowRight size={15} /></button>
                {message && <p role="status" className={`text-sm font-semibold ${requestState === "error" ? "text-[#8a342e]" : "text-[#386b46]"}`}>{message}</p>}
                <div className="flex justify-between gap-4 text-sm text-[#6d614c]"><Link className="font-bold text-[#8a342e] hover:underline" href="/register">Create account</Link><Link className="text-[#8a342e] hover:underline" href="/register">Forgot password?</Link></div>
              </form>
    </PvpAuthTemplate>
  );
}
