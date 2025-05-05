import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Country } from "src/types/country";

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1" }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => "/all?fields=name,flags,population,region,capital,cca2",
      keepUnusedDataFor: 60 * 60,
    }),
    getCountryByCode: builder.query<Country, string>({
      query: (code) => `/alpha/${code}`,
      transformResponse: (response: Country[]) => response[0],
      keepUnusedDataFor: 60 * 60,
    }),
    getBorderCountries: builder.query<Country[], string>({
      query: (codes) => `/alpha?codes=${codes}&fields=name,cca2`,
      // Return empty array if no codes provided
      keepUnusedDataFor: 60 * 60,
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetCountryByCodeQuery,
  useGetBorderCountriesQuery,
} = countriesApi;
