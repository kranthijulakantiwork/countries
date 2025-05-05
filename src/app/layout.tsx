import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "src/components/providers";
import Header from "src/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Country Explorer",
  description: "Explore countries around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-gray-100 dark:bg-gray-800 py-4">
              <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Country Explorer
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
