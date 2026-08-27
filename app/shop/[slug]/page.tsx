import Link from "next/link";
import { getProduct } from "../../../lib/services";
import { PageIntro, Panel, SiteShell } from "../../../components/SiteShell";
import { products } from "../../../data/mock";
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export default async function ProductPage({ params }: { params: { slug: string } }) { const product = await getProduct(params.slug); if (!product) return <SiteShell><PageIntro eyebrow="Shop" title="Item unavailable" /></SiteShell>; return <SiteShell><PageIntro eyebrow={product.category} title={product.name}>{product.description}</PageIntro><main className="form-wrap"><Panel><div className="product-art">✦</div><h2>€{product.price.toFixed(2)}</h2><p>Purchases require an authenticated Nimbus account. Payment processing will be connected to the Laravel API later.</p><Link className="button gold" href="/login">Sign in to purchase →</Link></Panel></main></SiteShell>; }
