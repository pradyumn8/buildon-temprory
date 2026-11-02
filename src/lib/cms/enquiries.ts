"use client";

/**
 * Enquiries, as the website writes them. Reading them back is leads.ts.
 *
 * The write goes straight from the browser to Postgres with the publishable
 * key, which is what makes it portable — there is no server in this project,
 * and the previous two routes both belonged to someone else. A `mailto:` link
 * hands the message back to the visitor and asks them to send it; Netlify
 * Forms works only while the site is on Netlify. Moving the site to another
 * host silently breaks the second one, with nothing in the build to say so.
 *
 * What stops the table filling with rubbish is not this file. Anything here
 * can be skipped by anyone who opens devtools and calls Supabase directly, so
 * the real limits are the length checks in the insert policy — see
 * 0003_enquiries.sql. The checks below exist to give a person a sensible error
 * before they press send.
 */

import { ENQUIRY_FORM } from "@/components/NetlifyForms";
import { supabase } from "./supabase";

export type Enquiry = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string | null;
  enquiry_type: string | null;
  product: string | null;
  quantity: number | null;
  city: string | null;
  country: string | null;
  source: string | null;
  page: string | null;
  handled: boolean;
  handled_at: string | null;
  note: string | null;
};

export type NewEnquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company?: string;
  enquiryType?: string;
  product?: string;
  /** Bags. Undefined means not asked; the form only asks once a product is picked. */
  quantity?: number;
  /** Where the browser appeared to be. A hint, often absent — see lib/geo.ts. */
  city?: string;
  country?: string;
  source?: string;
  page?: string;
};

/** Empty strings become null: a column that means "not asked" should not hold "". */
const orNull = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

/**
 * Hand the enquiry to Netlify Forms instead, when the database refused it.
 *
 * On 2 November 2026 the Supabase project was restricted for egress, and every
 * enquiry on the site fell through to a mail draft — which on a desktop with
 * no mail client is nothing at all. Netlify was already registered to receive
 * this form (NetlifyForms.tsx) and emails the desk from it, so a refused
 * insert now goes there and still reaches someone. It does not reach the admin
 * panel; it is in Netlify → Forms.
 *
 * Only the fields the hidden form lists survive the trip, so quantity and
 * place are written into the message rather than lost.
 *
 * Not on localhost: there is no Netlify there, and the dev server answers any
 * POST with 200, which would read as delivered.
 */
async function sendToNetlify(entry: NewEnquiry) {
  if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)) {
    throw new Error("no-host");
  }

  const extra = [
    entry.quantity ? `Quantity: ${entry.quantity} bags` : "",
    entry.city || entry.country
      ? `Place: ${[entry.city, entry.country].filter(Boolean).join(", ")}`
      : "",
  ].filter(Boolean);

  const body = new URLSearchParams({
    "form-name": ENQUIRY_FORM,
    name: entry.name.trim(),
    email: entry.email.trim(),
    phone: entry.phone.trim(),
    company: entry.company?.trim() ?? "",
    enquiryType: entry.enquiryType?.trim() ?? "",
    product: entry.product?.trim() ?? "",
    message: [entry.message.trim(), ...(extra.length ? ["", ...extra] : [])].join("\n"),
    source: entry.source?.trim() ?? "",
    page: entry.page?.trim() ?? "",
  });

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  /* Netlify answers 404 for a form it has not registered, so a 2xx here is
     a submission it actually kept. */
  if (!response.ok) throw new Error(`netlify-${response.status}`);
}

/**
 * Record an enquiry.
 *
 * Resolves to where it went: "database", or "netlify" when the database
 * refused it and Netlify Forms took it instead — in which case Netlify has
 * already been told, and the caller must not tell it a second time.
 *
 * Throws only when neither kept it, so the form can fall back to a mail draft
 * rather than telling someone their message was received when it was not.
 */
export async function submitEnquiry(entry: NewEnquiry): Promise<"database" | "netlify"> {
  try {
    await insertEnquiry(entry);
    return "database";
  } catch (error) {
    try {
      await sendToNetlify(entry);
      return "netlify";
    } catch {
      throw error;
    }
  }
}

async function insertEnquiry(entry: NewEnquiry) {
  if (!supabase) throw new Error("not-configured");

  const { error } = await supabase.from("enquiries").insert({
    name: entry.name.trim(),
    email: entry.email.trim(),
    phone: entry.phone.trim(),
    message: entry.message.trim(),
    company: orNull(entry.company),
    enquiry_type: orNull(entry.enquiryType),
    product: orNull(entry.product),
    quantity: Number.isFinite(entry.quantity) ? entry.quantity : null,
    city: orNull(entry.city),
    country: orNull(entry.country),
    source: orNull(entry.source),
    page: orNull(entry.page),
  });

  if (!error) return;

  /* A policy refusal means the row failed the length checks — which the form
     checks first, so reaching this is a bug rather than a typo. It is still
     thrown, because the visitor's message must not be lost either way. */
  throw new Error(error.message);
}

/* The admin half of this file moved to leads.ts when an enquiry became a
   lead with an owner, a place and a status. What is left is the public write:
   the only thing the website itself does. */
