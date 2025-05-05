"use client";

import Link from "next/link";
import CountryCard from "src/components/country-card";
import { Button } from "src/components/ui/button";
import { useRequireAuth } from "src/hooks/use-require-auth";
import { useGetCountriesQuery } from "src/store/api/countries-api";
import { selectFavorites } from "src/store/features/favorites-slice";
import { useAppSelector } from "src/store/hooks";

export default function FavoritesPage() {
  // Protect this page
  const isAuthenticated = useRequireAuth();

  const favorites = useAppSelector(selectFavorites);
  const { data: countries = [], isLoading, error } = useGetCountriesQuery();

  if (!isAuthenticated) {
    return null; // Will redirect in the hook
  }

  const favoriteCountries = countries.filter((country) =>
    favorites.includes(country.cca2)
  );

  if (isLoading) {
    return <div className="text-center py-10">Loading your favorites...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading favorites
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Favorite Countries</h1>

      {favoriteCountries.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">
            You haven&apos;t added any countries to your favorites yet.
          </p>
          <Button asChild>
            <Link href="/">Explore Countries</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca2} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}
