'use client'
import Footer from "./ui/components/footer"
import Header from "./ui/components/header"
import ButtonLink from "./ui/components/buttonLink"
import iconAPK from '@/public/images/light/MaterialSymbolsAndroid.svg'
import iconAPKReverse from '@/public/images/dark/MaterialSymbolsAndroid.svg'


const Home = () => {
    var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  (function() {
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src='https://matomo.webapps24.eu/js/container_ChvuZoFC.js'; s.parentNode.insertBefore(g,s);
  })();
    return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center flex-1 px-20 py-10 text-center">
        <h1 className="text-6xl font-bold light:text-gray-800 dark:text-white-800">
          Bienvenue sur <span className="text-green-500">Recipes App</span>
        </h1>
        <p className="mt-3 text-2xl light:text-gray-600 dark:text-white-600">
          Téléchargez notre application mobile dès maintenant !
        </p>
        <div className="flex flex-col lg:flex-row gap-2">
          <ButtonLink source='/download/apk/recipes-app-2024.1.5.apk' name="Télécharger l'application Android" action='Télécharger' icon={iconAPK} iconReverse={iconAPKReverse} iconDescription='Icone Android' /> 
        </div>
      </main>
      <Footer />
    </>
  )
}
export default Home;
