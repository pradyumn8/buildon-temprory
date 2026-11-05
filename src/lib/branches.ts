/**
 * Which branch sells which product, and the smallest order each one takes.
 *
 * A file rather than a table, for now. On 2 November 2026 the Supabase project
 * was restricted for egress and the places table could not be read, so this
 * started life as content/branches.json, written from Buildon's own list of
 * what each region stocks. The products page filters by it at build time,
 * and the Branches screen in the admin panel edits it and hands the file
 * back to be committed.
 *
 * Products are named by slug, the same one /products/<slug> uses, so a
 * renamed product keeps its branches and a deleted one simply drops out.
 */

import file from "@/../content/branches.json";

export type Branch = {
  id: string;
  name: string;
  /** Minimum order, in metric tons. */
  minTons: number;
  /** Product slugs this branch sells. */
  products: string[];
};

export const branches: Branch[] = file.branches;

const REMEMBER = "buildon.branch";

/**
 * The branch last picked on the products page, so the enquiry form can start
 * from it. Session-long and per visitor; empty when storage is blocked.
 */
export function rememberedBranch() {
  try {
    return window.sessionStorage.getItem(REMEMBER) ?? "";
  } catch {
    return "";
  }
}

export function rememberBranch(id: string) {
  try {
    if (id) window.sessionStorage.setItem(REMEMBER, id);
    else window.sessionStorage.removeItem(REMEMBER);
  } catch {
    /* A preset the form cannot make is not worth telling anyone about. */
  }
}
