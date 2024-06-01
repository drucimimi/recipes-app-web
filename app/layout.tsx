import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/styles/globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipes App",
  description: "Découvrir et/ou créer des recettes de cuisine",
  icons: {
    icon: '/images/favicon.ico',
  },
  keywords: ['Recipes App', 'Nextjs', 'REST API'],
  authors: [{ name: 'Drucilla' }, { name: 'Deroche', url: 'https://drucilla-deroche.vercel.app' }],
  metadataBase: new URL('https://recipes-app.webapps24.eu'),
  openGraph: {
    title: 'Recipes App',
    description: 'Découvrir et/ou créer des recettes de cuisine',
    url: 'https://recipes-app.webapps24.eu',
    siteName: 'Recipes App',
    images: '/images/og-image.png',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    title: 'Recipes App',
    description: 'Découvrir et/ou créer des recettes de cuisine',
    images: '/images/og-image.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
            {children}
        </body>
    </html>
  );
}
