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
  /** Where the branch is, for picking the one nearest a visitor. */
  lat?: number;
  lon?: number;
  /** Product slugs this branch sells. */
  products: string[];
};

export const branches: Branch[] = file.branches;

/**
 * The branch a visitor most likely buys from, among those given.
 *
 * Nearest by straight-line distance when both sides have coordinates — so
 * Thane lands on Mumbai and Secunderabad on Hyderabad, which a name match
 * would miss. Falls back to the city name when they do not (a branch added in
 * the panel without coordinates, or a lookup cached before they were kept).
 * Outside India there is no sensible guess, so none is made.
 */
export function nearestBranch(
  place: { city: string; country: string; lat?: number; lon?: number } | null,
  among: Branch[],
): Branch | null {
  if (!place || among.length === 0) return null;
  if (place.country && !/india/i.test(place.country)) return null;

  const city = place.city.trim().toLowerCase();
  const byName = among.find((b) => city && b.name.toLowerCase().includes(city)) ?? null;
  const { lat, lon } = place;
  if (lat === undefined || lon === undefined) return byName;

  /* Degrees, with longitude shrunk by latitude: plenty to rank cities a few
     hundred kilometres apart, and no trigonometry library. */
  const squared = (b: Branch) => {
    const dLat = (b.lat ?? 0) - lat;
    const dLon = ((b.lon ?? 0) - lon) * Math.cos((lat * Math.PI) / 180);
    return dLat * dLat + dLon * dLon;
  };
  const located = among.filter((b) => b.lat !== undefined && b.lon !== undefined);
  if (located.length === 0) return byName;
  return located.reduce((best, b) => (squared(b) < squared(best) ? b : best));
}

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
