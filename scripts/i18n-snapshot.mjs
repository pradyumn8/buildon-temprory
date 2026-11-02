/**
 * `npm run i18n:snapshot -- <translations_rows.csv>`
 *
 * Turn a CSV export of the translations table into a local copy that
 * i18n-pages.mjs falls back to when Supabase cannot be read.
 *
 * Why this exists: the cache lives in Supabase, and on 2 November 2026 the
 * project was restricted for exceeding its egress quota. Every build from then
 * on read nothing and shipped /mr and /hi in English, although all nine
 * thousand translations were sitting in the table. The dashboard can still
 * export the rows as CSV, so a copy on disk is a way to keep translating
 * while the database is unreachable.
 *
 * Written to supabase/snapshot/, which is gitignored. It is a stopgap, not a
 * second source of truth: the table stays the authority, and a snapshot only
 * knows what the table held on the day it was exported.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const SNAPSHOT = "supabase/snapshot/translations.json";

/** RFC 4180: quoted fields may hold commas, newlines and doubled quotes. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else quoted = false;
      } else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const file = process.argv[2];
if (!file) {
  console.error("\n  Usage: npm run i18n:snapshot -- <translations_rows.csv>\n");
  process.exit(1);
}

/* A UTF-8 BOM would otherwise end up glued to the first column's name. */
const [header, ...body] = parseCsv(readFileSync(file, "utf8").replace(/^﻿/, ""));
const need = ["locale", "source", "translated", "provider", "updated_at"];
const missing = need.filter((name) => !header.includes(name));
if (missing.length) {
  console.error(`\n  ${file} has no ${missing.join(", ")} column — is it the translations table?\n`);
  process.exit(1);
}

const at = Object.fromEntries(header.map((name, index) => [name, index]));
const rows = body
  .filter((cells) => cells.length === header.length)
  .map((cells) => Object.fromEntries(need.map((name) => [name, cells[at[name]]])))
  .filter((row) => row.source && row.translated);

const skipped = body.filter((cells) => cells.length > 1).length - rows.length;
const byLocale = rows.reduce((n, row) => ({ ...n, [row.locale]: (n[row.locale] ?? 0) + 1 }), {});

mkdirSync(dirname(SNAPSHOT), { recursive: true });
writeFileSync(SNAPSHOT, JSON.stringify({ exportedFrom: file, savedAt: new Date().toISOString(), rows }), "utf8");

console.log(`
  ${rows.length.toLocaleString()} translations saved to ${SNAPSHOT}
  ${Object.entries(byLocale).map(([locale, n]) => `${locale} ${n.toLocaleString()}`).join("   ")}${skipped ? `\n  ${skipped} malformed row(s) skipped` : ""}

  npm run i18n:pages -- --apply   uses it whenever Supabase cannot be read.
`);
