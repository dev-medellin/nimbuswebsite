import Link from "next/link";
import { getProduct } from "../../../lib/services";
import { Panel } from "../../../components/SiteShell";
import { PvpPageTemplate } from "../../../components/PvpTemplates";
import { products } from "../../../data/mock";
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export default async function ProductPage({ params }: { params: { slug: string } }) { const product = await getProduct(params.slug); if (!product) return <PvpPageTemplate eyebrow="Quartermaster" title="Item unavailable" />; return <PvpPageTemplate eyebrow={product.category} title={product.name} description={product.description} width="narrow"><Panel><div className="product-art">✦</div><h2>${product.price.toFixed(2)} USD</h2><p>Sign in to your Nimbus account to purchase securely with PayPal.</p><Link className="button gold" href="/login">Sign in to purchase →</Link></Panel></PvpPageTemplate>; }
