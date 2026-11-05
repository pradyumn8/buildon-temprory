import type { Metadata } from "next";
import BranchProductsEditor from "@/components/admin/BranchProductsEditor";
import PlacesEditor from "@/components/admin/PlacesEditor";

export const metadata: Metadata = { title: "Branches" };

/**
 * /admin/places — super admins only, which AuthGate and the policies enforce.
 *
 * Two lists for now: what each branch sells, which lives in
 * content/branches.json, and the branches leads are filed under, which live in
 * the database. In demo mode the database is unreachable, so only the first
 * is shown.
 */
export default function AdminPlacesPage() {
  const demo = process.env.NEXT_PUBLIC_ADMIN_DEMO === "1";
  return (
    <>
      <div className="p-5 pb-0 sm:p-8 sm:pb-0">
        {demo && (
          <h1 className="mb-6 font-display text-2xl font-semibold sm:text-3xl">Branches</h1>
        )}
        <BranchProductsEditor />
      </div>
      {!demo && <PlacesEditor />}
    </>
  );
}
