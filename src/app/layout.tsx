import type { Metadata } from "next";
import { Inter, Bebas_Neue, Montserrat } from 'next/font/google'
import "./globals.css";
import Header from "@/components/Generic/Header/Header";
import Footer from "@/components/Generic/Footer/Footer";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-accent',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Silver Screen | Movie Explorer",
  description: "Discover movies, explore genres, and build your watchlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} ${montserrat.variable}`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
