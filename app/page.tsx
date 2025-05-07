'use client'
import Footer from "./ui/components/footer"
import Header from "./ui/components/header"
import ButtonLink from "./ui/components/buttonLink"
import iconAPK from '@/public/images/light/MaterialSymbolsAndroid.svg'
import iconAPKReverse from '@/public/images/dark/MaterialSymbolsAndroid.svg'
import { useEffect } from "react"
import init from "@socialgouv/matomo-next"
import iconWeb from '@/public/images/light/MdiWeb.svg'
import iconWebReverse from '@/public/images/dark/MdiWeb.svg'


const Home = () => {
  const MATOMO_URL = process.env.MATOMO_URL || "https://matomo.webapps24.eu";
  const MATOMO_SITE_ID = process.env.MATOMO_SITE_ID || "1";
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);
    return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-20 py-10 text-center">
        <h1 className="text-6xl font-bold light:text-gray-800 dark:text-white-800">
          Bienvenue sur <span className="text-green-500">Recipes App</span>
        </h1>
        <p className="mt-3 text-2xl light:text-gray-600 dark:text-white-600">
          {/* Téléchargez notre application mobile dès maintenant ou voir la version web ci-dessous ! */}
          Téléchargez notre application mobile dès maintenant !
        </p>
        <div className="flex flex-col lg:flex-row gap-2">
          <ButtonLink source='/download/apk/recipes-app-2025.1.2.apk' name="Télécharger l'application Android" action='Télécharger' icon={iconAPK} iconReverse={iconAPKReverse} iconDescription='Icone Android' />
        </div>
        {/* <div className="flex flex-col lg:flex-row gap-2">
          <ButtonLink source='/web' name="Voir la version web" action='Voir' icon={iconWeb} iconReverse={iconWebReverse} iconDescription='Icone Web' />
        </div> */}
      </main>
      <Footer />
    </>
  )
}
export default Home;
