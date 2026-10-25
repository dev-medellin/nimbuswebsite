"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createPaypalCheckout } from "../lib/api";
import type { Product } from "../types";
import DonationTermsModal from "./DonationTermsModal";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

type CatalogItem = {
  itemId: number;
  name: string;
  description?: string;
  category?: string;
  categorySlug?: string;
  paypalPrice?: number;
  paypalCurrency?: string;
  isOutOfStock?: boolean;
  hasEffects?: boolean;
  stock?: number | null;
};

const isGarmentCategory = (value?: string) => /^garments?$/i.test((value || "").trim());
const isGarmentItem = (item: CatalogItem) => isGarmentCategory(item.categorySlug)
  || isGarmentCategory(item.category)
  || (item.itemId >= 180000 && item.itemId < 200000);

function ProductArtwork({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  if (!isGarmentCategory(product.category)) return null;
  return <div className="nimbus-garment-art" aria-label={`${product.name} garment image`}>
    {!failed && product.imageUrl ? <img src={product.imageUrl} alt={product.name} onError={() => setFailed(true)} /> : <span aria-hidden="true">✦</span>}
    <small>{product.hasEffects ? "Effect garment" : "Classic garment"}</small>
  </div>;
}

function money(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function stockLabel(stock?: number | null) {
  if (stock === null || stock === undefined) return "Unlimited stock";
  if (stock <= 0) return "Out of stock";
  if (stock === 1) return "Only 1 remaining";
  return `${stock.toLocaleString()} remaining`;
}

export function PaypalShopBrowser() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");
  const [termsOpen, setTermsOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/shop/catalog`, { headers: { Accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) throw new Error("Catalog unavailable");
        return response.json();
      })
      .then((payload: { items?: CatalogItem[] }) => {
        if (!active || !payload.items?.length) return;
        setProducts(payload.items.map((item) => {
          const garment = isGarmentItem(item);
          return {
          slug: String(item.itemId),
          itemId: item.itemId,
          name: item.name,
          description: item.description || "A useful addition for your journey.",
          category: garment ? "Garments" : (item.category || "Support"),
          price: garment ? (item.hasEffects ? 8 : 4) : (item.paypalPrice || 0) / 100,
          paypalPrice: garment ? (item.hasEffects ? 800 : 400) : (item.paypalPrice || 0),
          currency: item.paypalCurrency || "USD",
          available: !item.isOutOfStock,
          stock: item.stock ?? null,
          imageUrl: garment ? `/images/garments/${item.itemId}.png` : undefined,
          hasEffects: Boolean(item.hasEffects),
        };
        }));
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => ["All", "Garments", ...Array.from(new Set(products.map((p) => p.category).filter((entry) => !isGarmentCategory(entry))))], [products]);
  const visibleProducts = useMemo(() => category === "All" ? products : products.filter((p) => category === "Garments" ? isGarmentCategory(p.category) : p.category === category), [category, products]);
  const cartEntries = products.filter((product) => (cart[product.slug] || 0) > 0);
  const totalCents = cartEntries.reduce((sum, product) => sum + Math.round(product.price * 100) * (cart[product.slug] || 0), 0);

  function add(product: Product) {
    setError("");
    setCart((current) => {
      const currentQuantity = current[product.slug] || 0;
      if (product.stock !== null && product.stock !== undefined && currentQuantity >= product.stock) return current;
      return { ...current, [product.slug]: currentQuantity + 1 };
    });
  }

  function remove(product: Product) {
    setCart((current) => {
      const next = { ...current };
      if ((next[product.slug] || 0) <= 1) delete next[product.slug];
      else next[product.slug] -= 1;
      return next;
    });
  }

  async function checkout() {
    setError("");
    if (!cartEntries.length) return setError("Choose an item before continuing to PayPal.");
    if (cartEntries.some((product) => !product.itemId)) return setError("The live shop catalog is not available yet. Please refresh and try again.");
    setCheckingOut(true);
    try {
      const result = await createPaypalCheckout(cartEntries.map((product) => ({ itemId: product.itemId as number, quantity: cart[product.slug] })));
      if (!result.payment?.approvalUrl) throw new Error(result.message || "PayPal did not return an approval link.");
      window.location.assign(result.payment.approvalUrl);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Unable to start PayPal checkout.");
      setCheckingOut(false);
    }
  }

  return <div className="nimbus-shop-browser grid gap-8 lg:grid-cols-[1fr_330px]">
    <section>
      <div className="mb-6 flex flex-wrap gap-2">{categories.map((entry) => <button key={entry} type="button" onClick={() => setCategory(entry)} className={`border px-4 py-2 text-xs font-bold uppercase tracking-[.14em] ${category === entry ? "border-[#8a342e] bg-[#8a342e] text-white" : "border-[#b28a4e] text-[#263652]"}`}>{entry}</button>)}</div>
      {loading && <p className="mb-5 text-sm text-[#5f6470]">Loading the live catalog…</p>}
      { !loading && !visibleProducts.length ? <div className="border border-[#b28a4e] bg-[#f3e5c2] p-8 text-center text-sm text-[#5f6470]">No shop items are currently available.</div> : <div className="grid gap-5 sm:grid-cols-2">{visibleProducts.map((product) => <article key={product.slug} className="border border-[#b28a4e] bg-[#f3e5c2] p-5 shadow-[5px_5px_0_#c7ad77]">
        <ProductArtwork product={product} />
        <p className="text-xs font-bold uppercase tracking-[.16em] text-[#8a342e]">{product.category}{isGarmentCategory(product.category) ? ` · ${product.hasEffects ? "With effects" : "No effects"}` : ""}</p>
        <h3 className="mt-2 font-fantasy text-2xl text-[#263652]">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-[#5f6470]">{product.description}</p>
        <div className={`nimbus-stock ${product.stock === 0 ? "sold-out" : product.stock !== null && product.stock !== undefined && product.stock <= 3 ? "low-stock" : ""}`}><span aria-hidden="true" />{stockLabel(product.stock)}</div>
        <div className="mt-3 flex items-center justify-between gap-3"><span className="font-bold text-[#8a342e]">{money(Math.round(product.price * 100))}</span><button type="button" disabled={!product.available || (product.stock !== null && product.stock !== undefined && (cart[product.slug] || 0) >= product.stock)} onClick={() => add(product)} className="border border-[#263652] bg-[#263652] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#f8e9bc] disabled:cursor-not-allowed disabled:opacity-50">{!product.available ? "Sold out" : product.stock !== null && product.stock !== undefined && (cart[product.slug] || 0) >= product.stock ? "Max in cart" : "Add"}</button></div>
      </article>)}</div> }
    </section>
    <aside className="h-fit border-2 border-[#b28a4e] bg-[#263652] p-5 text-[#f8e9bc] lg:sticky lg:top-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#f4ca55]">Donation checkout</p><h2 className="mt-2 font-fantasy text-2xl">Your selection</h2><div className="my-5 space-y-3">{cartEntries.length ? cartEntries.map((product) => <div key={product.slug} className="flex items-center justify-between gap-3 border-b border-[#53627a] pb-3 text-sm"><span>{product.name} × {cart[product.slug]}</span><button type="button" onClick={() => remove(product)} className="text-[#f4ca55]">Remove</button></div>) : <p className="text-sm text-[#c8d0d8]">Your cart is empty.</p>}</div><div className="flex justify-between border-t border-[#53627a] pt-4 font-bold"><span>Total</span><span>{money(totalCents)}</span></div>{error && <p className="mt-4 border border-[#e3a4a0] bg-[#5b2928] p-3 text-sm text-white">{error}</p>}<button type="button" onClick={() => setTermsOpen(true)} disabled={checkingOut || !cartEntries.length} className="mt-5 w-full bg-[#f4ca55] px-4 py-3 text-sm font-bold uppercase tracking-[.12em] text-[#263652] disabled:cursor-not-allowed disabled:opacity-50">{checkingOut ? "Opening PayPal…" : "Review terms to continue"}</button><p className="mt-3 text-center text-xs text-[#c8d0d8]">Prices and payment are processed in USD.</p><Link href="/account" className="mt-4 block text-center text-xs uppercase tracking-[.12em] text-[#f4ca55]">Manage your account</Link></aside>
    <DonationTermsModal open={termsOpen} onClose={() => setTermsOpen(false)} onAccept={() => { setTermsOpen(false); void checkout(); }} />
  </div>;
}
