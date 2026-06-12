import { Suspense } from "react";
import { CatalogueContent } from "./CatalogueContent";

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 text-center text-stone-500 sm:px-6">
          Chargement du catalogue...
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
