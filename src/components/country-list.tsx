"use client";

import { useGetCountriesQuery } from "src/store/api/countries-api";
import CountryCard from "./country-card";
import { useAppSelector } from "src/store/hooks";
import {
  selectRegionFilter,
  selectSearchTerm,
} from "src/store/features/filters-slice";
import { Alert, AlertDescription, AlertTitle } from "src/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CountryList() {
  const { data: countries = [], isLoading, error } = useGetCountriesQuery();
  const searchTerm = useAppSelector(selectSearchTerm);
  const regionFilter = useAppSelector(selectRegionFilter);

  if (isLoading) {
    return <div className="text-center py-10">Loading countries...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load countries. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  // Apply filters
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      regionFilter === "" || country.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  if (filteredCountries.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          No countries found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredCountries.map((country) => (
        <CountryCard key={country.cca2} country={country} />
      ))}
    </div>
  );
}
