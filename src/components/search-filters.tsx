"use client";

import { Input } from "src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Search } from "lucide-react";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  selectRegionFilter,
  selectSearchTerm,
  setRegionFilter,
  setSearchTerm,
} from "src/store/features/filters-slice";
import { useEffect, useState } from "react";
import { useDebounce } from "src/hooks/use-debounce";

export default function SearchFilters() {
  const dispatch = useAppDispatch();
  const storedSearchTerm = useAppSelector(selectSearchTerm);
  const regionFilter = useAppSelector(selectRegionFilter);

  // Local state for controlled input
  const [searchTerm, setLocalSearchTerm] = useState(storedSearchTerm);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update redux store when debounced search term changes
  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleRegionChange = (value: string) => {
    dispatch(setRegionFilter(value));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a country..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
        />
      </div>

      <Select value={regionFilter} onValueChange={handleRegionChange}>
        <SelectTrigger className="w-full sm:w-52">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          <SelectItem value="Africa">Africa</SelectItem>
          <SelectItem value="Americas">Americas</SelectItem>
          <SelectItem value="Asia">Asia</SelectItem>
          <SelectItem value="Europe">Europe</SelectItem>
          <SelectItem value="Oceania">Oceania</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
