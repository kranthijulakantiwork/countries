import type { Country } from "src/types/country";

const API_BASE_URL = "https://restcountries.com/v3.1";

export async function getCountryByCode(code: string): Promise<Country> {
  const response = await fetch(`${API_BASE_URL}/alpha/${code}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch country with code ${code}`);
  }

  const data = await response.json();
  return data[0];
}
