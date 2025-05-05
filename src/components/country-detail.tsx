"use client";

import { ArrowLeft, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "src/components/ui/button";
import { useRequireAuth } from "src/hooks/use-require-auth";
import { formatNumber } from "src/lib/utils";
import { useGetBorderCountriesQuery } from "src/store/api/countries-api";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "src/store/features/favorites-slice";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import type { Country } from "src/types/country";

interface CountryDetailProps {
  country: Country;
}

export default function CountryDetail({ country }: CountryDetailProps) {
  // Protect this component
  const isAuthenticated = useRequireAuth();

  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.includes(country.cca2);

  // Get border countries if any
  const borderCodes = country.borders || [];
  const { data: borderCountries = [] } = useGetBorderCountriesQuery(
    borderCodes.join(","),
    {
      skip: borderCodes.length === 0,
    }
  );

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(country.cca2));
      toast.success(`${country.name.common} removed from favorites.`);
    } else {
      dispatch(addFavorite(country.cca2));
      toast.success(`${country.name.common} added to favorites!`);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in the hook
  }

  // Extract country details
  const nativeName =
    Object.values(country.name.nativeName || {})[0]?.common ||
    country.name.common;
  const currencies = Object.values(country.currencies || {})
    .map((c) => `${c.name} (${c.symbol})`)
    .join(", ");
  const languages = Object.values(country.languages || {}).join(", ");
  const tld = country.tld?.join(", ") || "N/A";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Countries
          </Link>
        </Button>

        <Button
          variant={isFavorite ? "default" : "outline"}
          onClick={handleFavoriteToggle}
          className={isFavorite ? "bg-red-500 hover:bg-red-600" : ""}
        >
          <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-white" : ""}`} />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg shadow-md">
          <Image
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p>
                <span className="font-semibold">Native Name:</span> {nativeName}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {formatNumber(country.population)}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.join(", ") || "N/A"}
              </p>
            </div>

            <div>
              <p>
                <span className="font-semibold">Top Level Domain:</span> {tld}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {currencies || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {languages || "N/A"}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="pt-4">
              <h2 className="font-semibold text-lg mb-3">Border Countries:</h2>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Button key={border.cca2} variant="outline" size="sm" asChild>
                    <Link href={`/country/${border.cca2}`}>
                      {border.name.common}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
