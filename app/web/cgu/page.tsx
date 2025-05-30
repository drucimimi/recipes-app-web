import Footer from "@/components/footer"
import Header from "@/components/header"
import iconContract from "@/public/images/light/MaterialSymbolsContract.svg"
import iconReverseContract from "@/public/images/dark/MaterialSymbolsContract.svg"
import iconBackHome from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackHome from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import ButtonLink from "@/components/ui/buttonLink"

const CGU = () => {
    return (
        <>
            <Header icon={iconContract} iconReverse={iconReverseContract} iconDescription={"icone de contrat"} title={"Conditions générales d'utilisation"} hasMenu={false} role={""} />
            <main className="flex flex-col flex-1 p-10 mb-20 gap-2">
                <ButtonLink source={"/web"} name={"Retour à la page d'accueil"} action={"Retour"} icon={iconBackHome} iconReverse={iconReverseBackHome} iconDescription={"Retour à la page d'accueil"}></ButtonLink>
                <h1>Article 1 : Objet</h1>
                <p>Les présentes CGU ou Conditions Générales d’Utilisation encadrent juridiquement l’utilisation des services du site et de l'application Recipes App (ci-après dénommé « le site »). Constituant le contrat entre le propriétaire du site et de l'application Recipes App, l’Utilisateur, l’accès au site et à l'application doit être précédé de l’acceptation de ces CGU. L’accès à cette plateforme signifie l’acceptation des présentes CGU.</p>
                <h1>Article 2 : Mentions légales</h1>
                <p>L’édition du site et de l'application mobile est assurée par Drucilla Deroche. L’hébergeur du site recipes-app.webapps24.eu et de son application mobile est la société Contabo GmbH, situé au Aschauer Strasse 32a 81549 Munich Allemagne.</p>
                <h1>Article 3 : Accès au site et à l'application mobile</h1>
                <p>L'application mobile et le site web Recipes App permettent d’accéder gratuitement aux services suivants :<br /> -Téléchargement de l'application mobile<br /> -Lecture de recettes sans ou avec compte utilisateur,<br /> -Création et suppression de recettes avec compte utilisateur : pour que la recette soit publiée il faut qu'elle soit approuvée par l'administrateur; si elle est rejetée elle ne sera ni sauvegardée ni publiée.<br /> Le site et l'application mobile sont accessibles gratuitement depuis n’importe où par tout utilisateur disposant d’un accès à Internet. Tous les frais nécessaires pour l’accès aux services (matériel informatique, connexion Internet…) sont à la charge de l’utilisateur. L’accès aux services dédiés aux membres s’effectue à l’aide d’un identifiant (email) et d’un mot de passe. Pour des raisons de maintenance ou autres, l’accès au site peut être interrompu ou suspendu par l’éditeur sans préavis ni justification.</p>
                <h1>Article 4 : Collecte des données</h1>
                <p>Pour la création du compte de l’Utilisateur, la collecte des informations au moment de l’inscription sur l'application mobile ou sur le site web est nécessaire et obligatoire. Conformément à la loi n°78-17 du 6 janvier relative à l’informatique, aux fichiers et aux libertés, la collecte et le traitement d’informations personnelles s’effectuent dans le respect de la vie privée. Suivant la loi Informatique et Libertés en date du 6 janvier 1978, articles 39 et 40, l’Utilisateur dispose du droit d’accéder, de rectifier, de supprimer et d’opposer ses données personnelles. L’exercice de ce droit s’effectue par son espace client.</p>
                <h1>Article 5 : Propriété intellectuelle</h1>
                <p>Les marques, logos ainsi que les contenus du site ou de l'application mobile Recipes App (illustrations graphiques, textes) sont protégés par le Code de la propriété intellectuelle et par le droit d’auteur. La reproduction et la copie des contenus par l’Utilisateur requièrent une autorisation préalable du site ou de l'application mobile. Dans ce cas, toute utilisation à des usages commerciaux ou à des fins publicitaires est proscrite.</p>
                <h1>Article 6 : Responsabilité</h1>
                <p>Bien que les informations publiées sur le site ou l'application mobile soient réputées fiables, le site et l'application mobile se réservent la faculté d’une non-garantie de la fiabilité des sources. Les informations diffusées sur le site ou l'application mobile Recipes App sont présentées à titre purement informatif et sont sans valeur contractuelle. En dépit des mises à jour régulières, la responsabilité du site ou de l'application mobile ne peut être engagée en cas de modification des dispositions administratives et juridiques apparaissant après la publication. Il en est de même pour l’utilisation et l’interprétation des informations communiquées sur la plateforme. Le site et l'application mobile déclinent toute responsabilité concernant les éventuels virus pouvant infecter le matériel informatique de l’Utilisateur après l’utilisation ou l’accès à ce site ou cette application mobile. Le site ou l'application mobile ne peut être tenu pour responsable en cas de force majeure ou du fait imprévisible et insurmontable d’un tiers. La garantie totale de la sécurité et la confidentialité des données n’est pas assurée par le site ou l'application mobile. Cependant, le site s’engage à mettre en œuvre toutes les méthodes requises pour le faire au mieux.</p>
                <h1>Article 11 : Durée du contrat</h1>
                <p>Le présent contrat est valable pour une durée indéterminée. Le début de l’utilisation des services du site marque l’application du contrat à l’égard de l’Utilisateur.</p>
            </main>
            <Footer />
        </>
    )
}
export default CGU