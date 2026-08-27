"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) { return <main className="message-page"><p className="eyebrow">A storm has passed</p><h1>Something went wrong.</h1><button className="button gold" onClick={reset}>Try again</button> <Link className="button" href="/">Return home</Link></main>; }
