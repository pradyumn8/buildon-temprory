import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { branches } from "@/lib/branches";
import { products, productsPage, site } from "@/lib/content";
/* The grid and its heading come from the published file, so an edit in the
   admin panel reaches this page after the next pull. */
import { publishedProducts } from "@/lib/cms/published";

export const metadata: Metadata = {
  title: productsPage.title,
  description: `${publishedProducts.heading} ${publishedProducts.intro}`,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: `${site.url}/products/`,
    title: `${productsPage.title} | ${site.name}`,
    description: publishedProducts.heading,
  },
};

/**
 * The reference runs this page without a title bar: the heading sits straight
 * under the header, then every product in a three-up grid.
 *
 * Cards are a grid rather than the home page's carousel — nine products is a
 * catalogue to browse, not a row to page through.
 */
export default function ProductsPage() {
  return (
    <>
      <SiteHeader />

      <main id="main">
        <section className="section-y">
          <div className="container-page">
            <Reveal>
              <SectionHeading
                title={publishedProducts.heading}
                intro={publishedProducts.intro}
                align="center"
              />
            </Reveal>

            <ProductGrid
              items={publishedProducts.items.map((product) => ({
                slug: product.slug,
                name: product.name,
                href: product.href,
                image: product.image,
                cardBody: product.cardBody,
              }))}
              branches={branches}
              readMore={products.readMore}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
