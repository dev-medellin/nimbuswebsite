import { Suspense } from "react";
import PaypalSuccessContent from "../../../../components/PaypalSuccessContent";

export default function PaypalSuccessPage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-[#08151d] text-[#f8e9bc]">Confirming your PayPal payment…</main>}><PaypalSuccessContent /></Suspense>;
}
