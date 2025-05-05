"use client";

import type React from "react";

import type { Country } from "src/types/country";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "src/components/ui/card";
import Image from "next/image";
import { Button } from "src/components/ui/button";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "src/store/features/favorites-slice";
import { selectIsAuthenticated } from "src/store/features/auth-slice";
import { useRouter } from "next/navigation";
import { formatNumber } from "src/lib/utils";
import { toast } from "sonner";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.includes(country.cca2);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(country.cca2));
      toast.success(`Removed ${country.name.common} from favorites.`);
    } else {
      dispatch(addFavorite(country.cca2));
      toast.success(`Added ${country.name.common} to favorites!`);
    }
  };

  const handleCardClick = () => {
    if (!isAuthenticated) {
      router.push(`/login?returnUrl=/country/${country.cca2}`);
      return;
    }

    router.push(`/country/${country.cca2}`);
  };

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative h-40 w-full">
        <Image
          src={country.flags.svg || country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h2 className="font-bold text-xl truncate">{country.name.common}</h2>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isFavorite ? "text-red-500" : ""}`}
            onClick={handleFavoriteToggle}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
        <p>
          <span className="font-semibold">Population:</span>{" "}
          {formatNumber(country.population)}
        </p>
        <p>
          <span className="font-semibold">Region:</span> {country.region}
        </p>
        <p>
          <span className="font-semibold">Capital:</span>{" "}
          {country.capital?.join(", ") || "N/A"}
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="p-0 h-auto" asChild>
          <span>View details</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
