import CountryList from "src/components/country-list";
import SearchFilters from "src/components/search-filters";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Explore Countries</h1>
      <SearchFilters />
      <Suspense fallback={<CountryListSkeleton />}>
        <CountryList />
      </Suspense>
    </div>
  );
}

function CountryListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md animate-pulse"
        >
          <div className="h-40 bg-gray-200 dark:bg-gray-700"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
