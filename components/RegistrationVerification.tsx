"use client";

import { useEffect, useState } from "react";
import { registrationToken } from "../lib/recaptcha";

export default function RegistrationVerification({ enabled, attempt, onVerified }: {
  enabled: boolean; attempt: number; onVerified: (ticket: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [retry, setRetry] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    let expiry: ReturnType<typeof setTimeout>;
    const controller = new AbortController();
    onVerified("");
    setFailed(false);
    if (!enabled) { setMessage("Read and accept the terms to start verification."); return; }
    setMessage("Verifying…");
    async function verify() {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      try {
        const token = await registrationToken();
        if (!active) return;
        timeout = setTimeout(() => controller.abort(), 12000);
        const base = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
        const response = await fetch(`${base}/register/verify`, {
          method: "POST", signal: controller.signal,
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ agreeTerms: true, recaptchaToken: token }),
        });
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          console.error("Registration verification API returned a non-JSON response", { url: response.url, status: response.status, contentType });
          throw new Error("Registration verification is temporarily unavailable. Please contact support if this continues.");
        }
        const payload = await response.json().catch(() => null);
        if (!payload || typeof payload !== "object") throw new Error("Registration verification is temporarily unavailable. Please retry later.");
        if (!response.ok || typeof payload.ticket !== "string" || !payload.ticket) throw new Error(payload.message || "Verification failed. Please retry.");
        if (!active) return;
        onVerified(payload.ticket);
        setMessage("Verification passed. You can now register.");
        expiry = setTimeout(() => {
          if (active) { onVerified(""); setMessage("Verification expired. Please verify again."); setFailed(true); }
        }, 100000);
      } catch (error) {
        if (active) { setMessage(error instanceof Error && error.name !== "AbortError" ? error.message : "Verification timed out. Please retry."); setFailed(true); }
      } finally { clearTimeout(timeout); }
    }
    void verify();
    return () => { active = false; controller.abort(); clearTimeout(expiry); };
  }, [enabled, attempt, retry, onVerified]);

  return <div className="text-sm text-[#5e5545]">
    <p role="status">{message}</p>
    {enabled && failed && <button type="button" className="mt-2 font-bold text-[#8a342e] underline" onClick={() => setRetry((value) => value + 1)}>Retry verification</button>}
    <p className="mt-2 text-xs">This site is protected by reCAPTCHA and the Google <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</p>
  </div>;
}
