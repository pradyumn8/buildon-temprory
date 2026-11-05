"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { rememberBranch, type Branch } from "@/lib/branches";
import { localeOf } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

type Card = {
  slug: string;
  name: string;
  href: string;
  image: string;
  cardBody: string;
};

/**
 * The catalogue, filtered to what one branch sells.
 *
 * "All branches" is the default and shows every product, so the page reads
 * exactly as it did before the filter existed for anyone who never touches
 * it — and the prerendered HTML, which is what search engines and the
 * translator see, is the full catalogue.
 */
export default function ProductGrid({
  items,
  branches,
  readMore,
}: {
  items: Card[];
  branches: Branch[];
  readMore: string;
}) {
  const t = getDictionary(localeOf(usePathname() ?? "/")).branches;
  const [branchId, setBranchId] = useState("");
  const branch = branches.find((entry) => entry.id === branchId) ?? null;

  const shown = branch ? items.filter((item) => branch.products.includes(item.slug)) : items;
  const fill = (text: string) =>
    branch ? text.replace("{branch}", branch.name).replace("{tons}", String(branch.minTons)) : text;

  return (
    <>
      <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
        <label className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
          <span className="text-sm font-semibold text-ink-900">{t.label}</span>
          <select
            suppressHydrationWarning
            value={branchId}
            onChange={(event) => {
              setBranchId(event.target.value);
              rememberBranch(event.target.value);
            }}
            className="min-w-[14rem] cursor-pointer rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink-900 transition hover:border-brand-200 focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none"
          >
            <option value="">{t.all}</option>
            {branches.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>
        </label>

        {branch && (
          <p role="status" className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-600">
            {fill(t.minimum)}
          </p>
        )}
      </div>

      {branch && shown.length === 0 && (
        <p className="mt-10 text-center text-[15px] text-ink-500">{fill(t.none)}</p>
      )}

      <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3">
        {shown.map((product, i) => (
          <Reveal
            as="li"
            /* The branch is in the key so a change of branch replays the
               entrance rather than leaving cards jumping into gaps. */
            key={`${branchId}:${product.slug}`}
            delay={Math.min(i % 3, 2) * 0.08}
            className="flex"
          >
            {/* The whole card is the link, as on the detail pages' More
                Products: one target per product, and one link named after
                it rather than nine identical "Read More"s. */}
            <Link
              href={product.href}
              className="group flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-lift focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
                  loading={i < 3 ? "eager" : "lazy"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h2 className="text-xl leading-snug font-semibold transition-colors group-hover:text-brand-500 sm:text-2xl">
                  {product.name}
                </h2>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500 sm:mt-2.5">
                  {product.cardBody}
                </p>
                {/* Display only: the card itself is the link, so this is
                    the reference's affordance without a second tab stop
                    or a link screen readers would announce as "Read More"
                    instead of the product's name. */}
                <span
                  aria-hidden
                  className="mt-4 inline-flex items-center self-start text-sm font-semibold text-brand-500 transition group-hover:text-brand-600 sm:mt-5"
                >
                  {readMore}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </>
  );
}
