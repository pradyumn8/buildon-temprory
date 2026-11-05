"use client";

/**
 * The working copy of content/branches.json, shared by two admin screens.
 *
 * Branches edits where the branches are and their minimum order; Products
 * edits which branches sell each product. Both are the same file, so they
 * share one copy here rather than each holding its own and overwriting the
 * other's changes on download.
 *
 * Kept in this browser until downloaded. The site is a static export with no
 * server to write the file to — replacing content/branches.json with the
 * download and deploying is what publishes it.
 */

import { useSyncExternalStore } from "react";
import { branches as shipped, type Branch } from "@/lib/branches";

const KEY = "buildon.branches.draft.v1";

let current: Branch[] | null = null;
let edited = false;
const listeners = new Set<() => void>();

function load(): Branch[] {
  if (current) return current;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      current = JSON.parse(raw) as Branch[];
      edited = true;
      return current;
    }
  } catch {
    /* Storage blocked or the draft unreadable: start from the file. */
  }
  current = shipped;
  return current;
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The branches as edited so far, and whether they differ from the file. */
export function useBranches() {
  const list = useSyncExternalStore(subscribe, load, () => shipped);
  const changed = useSyncExternalStore(subscribe, () => (load(), edited), () => false);
  return { list, changed };
}

export function setBranches(next: Branch[]) {
  current = next;
  edited = true;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* The edits still hold for this visit; the download carries them. */
  }
  emit();
}

/** Throw the draft away and go back to what content/branches.json says. */
export function revertBranches() {
  current = shipped;
  edited = false;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* Nothing stored means nothing to clear. */
  }
  emit();
}

/** Hand the draft back as the file to commit. */
export function downloadBranches() {
  const blob = new Blob([JSON.stringify({ branches: load() }, null, 2) + "\n"], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "branches.json";
  link.click();
  URL.revokeObjectURL(url);
}
