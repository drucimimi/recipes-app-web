import Header from "@/components/header"
import { apiRequest } from "@/services/httpCall"
import { PageRecipe, Recipe} from "@/types/definitions"
import logo from '@/public/images/light/logo.svg'
import logoReverse from '@/public/images/dark/logo.svg'
import Footer from "@/components/footer"
import ButtonLink from "@/components/ui/buttonLink"
import iconAdd from '@/public/images/light/MaterialSymbolsAddCircle.svg'
import iconReverseAdd from '@/public/images/dark/MaterialSymbolsAddCircle.svg'
import RecipeCard from "@/components/recipeCard"
import { cookies } from "next/headers"
import SearchForm from "@/components/form/searchForm"
import Pagination from "@/components/pagination"
import { decrypt } from "@/services/hashData"

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>
}

const HomeWeb = async ({searchParams}:PageProps) => {
    const session = (await cookies()).get("session")?.value
    const userInfo = session ? await decrypt(session) : null
    const userDetail = userInfo?.userDetail
    const searchParamsGet = await searchParams
    let currentPage = searchParamsGet.page ? Number(searchParamsGet.page) : 0
    let recipes:Recipe[] = []
    let filteredRecipes:Recipe[] = []
    let totalPages = 1
    let searchTerm = searchParamsGet.query as string ?? ""
    let error

    // récupération des recettes
    try {
        const response = await apiRequest(`/recipes?pageKey=${currentPage}`)
        if(response.status == 200){
            const data: PageRecipe = await response.json()
            recipes = data.recipesData
            filteredRecipes = data.recipesData
            totalPages = data.totalPages
        } else if(response.status == 429){
            error = "Limite de requêtes atteinte. Réessayez demain"
        }
    } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
    }
    filteredRecipes = searchTerm?.trim() ? recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || recipe.author.toLowerCase().includes(searchTerm.toLowerCase())) : recipes
    return (
        <>
            <Header icon={logo} iconReverse={logoReverse} iconDescription={"Logo Recipes App"} title={"Recipes App"} hasMenu={true} role={userDetail?.roleName ?? ""} userInfo={userDetail} />
            <main className="flex flex-col flex-1 px-10 pt-10 pb-36">
                <h1>Liste des recettes</h1>
                {/* Ajouter une recette */}
                {userDetail != null && <div className="my-2">
                    <ButtonLink source={"/web/protected/createRecipe"} name={"Ajouter une recette"} action={"Ajouter"} icon={iconAdd} iconReverse={iconReverseAdd} iconDescription={"icone ajout"} />
                </div>}
                {filteredRecipes.length == 0 && <p className="flex flex-1 justify-center p-40 text-xl">Aucune recette trouvée</p>}
                {error && <p style={{color: "#F69C9C"}}>{error}</p>}
                {filteredRecipes.length > 0 && <>
                    {/* Barre de recherche */}
                    <SearchForm currentPage={currentPage} />

                    {/* Liste des recettes */}
                   <div className="flex flex-wrap gap-2 pt-4">
                        {filteredRecipes.map( (recipe) => (
                            <RecipeCard recipe={recipe} key={recipe.id}/>
                        )) }
                    </div>

                    {/* Pagination */}
                    <Pagination totalPages={totalPages} />
                </>}
            </main>
            <Footer/>
        </>
    )
}
export default HomeWeb