import CountryDetail from "src/components/country-detail";
import { getCountryByCode } from "src/lib/api";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const country = await getCountryByCode(params.id);
    return {
      title: `${country.name.common} | Country Explorer`,
      description: `Learn about ${country.name.common}, its geography, population, and more.`,
    };
  } catch {
    return {
      title: "Country Not Found | Country Explorer",
      description: "The requested country could not be found.",
    };
  }
}

export default async function CountryPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const country = await getCountryByCode(params.id);
    return <CountryDetail country={country} />;
  } catch {
    notFound();
  }
}
