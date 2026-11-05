"use client";

/**
 * Branches and their minimum order — the place half of content/branches.json.
 *
 * Which products each branch sells is set on the Products screen, against
 * each product, because that is where somebody adding a product thinks about
 * where it is sold. Both screens edit the same working copy (branchDraft.ts),
 * and either one's download carries both halves.
 */

import { useState } from "react";
import {
  downloadBranches,
  revertBranches,
  setBranches,
  useBranches,
} from "@/lib/cms/branchDraft";
import type { Branch } from "@/lib/branches";
import { useToast } from "./Toast";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The download, with the one sentence that says what to do with it. */
export function BranchFileActions() {
  const { notify, confirm } = useToast();
  const { changed } = useBranches();

  async function revert() {
    const ok = await confirm({
      title: "Start again from the file?",
      body: "Every branch and availability change made here since the last download is thrown away.",
      confirmLabel: "Start again",
    });
    if (ok) revertBranches();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {changed && (
        <button
          type="button"
          onClick={() => void revert()}
          className="cursor-pointer rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition hover:border-brand-200 hover:text-brand-500"
        >
          Start again from the file
        </button>
      )}
      <button
        type="button"
        onClick={() => {
          downloadBranches();
          notify(
            "branches.json downloaded",
            "Replace content/branches.json in the project with it, then deploy.",
            "success",
          );
        }}
        className="cursor-pointer rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        Download branches.json
      </button>
    </div>
  );
}

export default function BranchProductsEditor() {
  const { notify, confirm } = useToast();
  const { list } = useBranches();
  const [name, setName] = useState("");

  const patch = (id: string, change: Partial<Branch>) =>
    setBranches(list.map((branch) => (branch.id === id ? { ...branch, ...change } : branch)));

  function add(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    const id = slugify(trimmed);
    if (!id) return;
    if (list.some((branch) => branch.id === id)) {
      notify(`There is already a branch called ${trimmed}.`, undefined, "danger");
      return;
    }
    setBranches([...list, { id, name: trimmed, minTons: 30, products: [] }]);
    setName("");
    notify(`${trimmed} added`, "Tick it on the Products screen for each product it sells.", "success");
  }

  async function remove(branch: Branch) {
    const ok = await confirm({
      title: `Remove ${branch.name}?`,
      body: "It disappears from the products page filter once the new file is deployed.",
      confirmLabel: "Remove",
    });
    if (ok) setBranches(list.filter((entry) => entry.id !== branch.id));
  }

  return (
    <section className="rounded-2xl border border-line bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h2 className="font-display text-xl font-semibold">Branches and minimum order</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
            Which products each branch sells is set on the Products screen. Changes stay
            in this browser until you download the file, replace{" "}
            <code className="text-ink-900">content/branches.json</code> with it and deploy.
          </p>
        </div>
        <BranchFileActions />
      </div>

      <table className="mt-6 w-full max-w-xl border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs text-ink-500">
            <th className="py-2 pr-3 font-semibold">Place</th>
            <th className="py-2 pr-3 font-semibold">Minimum order (tons)</th>
            <th className="py-2 pr-3 font-semibold">Products</th>
            <th className="py-2" />
          </tr>
        </thead>
        <tbody>
          {list.map((branch) => (
            <tr key={branch.id} className="border-b border-line/60">
              <td className="py-2 pr-3">
                <input
                  value={branch.name}
                  onChange={(event) => patch(branch.id, { name: event.target.value })}
                  aria-label="Place"
                  className="w-full min-w-32 rounded-lg border border-line px-2 py-1.5"
                />
              </td>
              <td className="py-2 pr-3">
                <input
                  type="number"
                  min={0}
                  step={0.5}
                  value={branch.minTons}
                  onChange={(event) =>
                    patch(branch.id, { minTons: Math.max(0, Number(event.target.value) || 0) })
                  }
                  aria-label={`Minimum tons for ${branch.name}`}
                  className="w-24 rounded-lg border border-line px-2 py-1.5"
                />
              </td>
              <td className="py-2 pr-3 text-ink-500">{branch.products.length}</td>
              <td className="py-2 pl-2 text-right">
                <button
                  type="button"
                  onClick={() => void remove(branch)}
                  className="cursor-pointer text-xs font-semibold text-ink-500 transition hover:text-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={add} className="mt-4 flex flex-wrap gap-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="New place, e.g. Surat"
          aria-label="New place"
          className="w-56 rounded-full border border-line px-4 py-2 text-sm"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-900 transition hover:border-brand-200 hover:text-brand-500"
        >
          Add place
        </button>
      </form>
    </section>
  );
}

/**
 * The branches one product is sold at, for the Products screen.
 *
 * Ticking a branch here writes the product into that branch's list, which is
 * the shape the products page filter reads.
 */
export function ProductBranches({ slug }: { slug: string }) {
  const { list } = useBranches();

  function toggle(branch: Branch) {
    const has = branch.products.includes(slug);
    setBranches(
      list.map((entry) =>
        entry.id !== branch.id
          ? entry
          : {
              ...entry,
              products: has
                ? entry.products.filter((s) => s !== slug)
                : [...entry.products, slug],
            },
      ),
    );
  }

  const all = list.length > 0 && list.every((branch) => branch.products.includes(slug));

  return (
    <fieldset className="border-t border-line pt-4">
      <legend className="text-sm font-semibold text-ink-900">Available at</legend>
      <p className="mt-1 text-sm text-ink-500">
        The products page shows this product only for the branches ticked here.
      </p>
      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={all}
          onChange={() =>
            setBranches(
              list.map((entry) => ({
                ...entry,
                products: all
                  ? entry.products.filter((s) => s !== slug)
                  : entry.products.includes(slug)
                    ? entry.products
                    : [...entry.products, slug],
              })),
            )
          }
          className="size-4 cursor-pointer accent-brand-500"
        />
        All branches
      </label>
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
        {list.map((branch) => (
          <label key={branch.id} className="inline-flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={branch.products.includes(slug)}
              onChange={() => toggle(branch)}
              className="size-4 cursor-pointer accent-brand-500"
            />
            {branch.name}
            <span className="text-xs text-ink-500">· {branch.minTons} t</span>
          </label>
        ))}
      </div>
      <div className="mt-4">
        <BranchFileActions />
      </div>
    </fieldset>
  );
}
