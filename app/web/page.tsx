"use client"

import Header from "@/components/header"
import { apiRequest } from "@/services/httpCall"
import { PageRecipe, Recipe, UserResponse } from "@/types/definitions"
import { useCallback, useEffect, useState } from "react"
import logo from '@/public/images/light/logo.svg'
import logoReverse from '@/public/images/dark/logo.svg'
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ButtonLink from "@/components/ui/buttonLink"
import iconAdd from '@/public/images/light/MaterialSymbolsAddCircle.svg'
import iconReverseAdd from '@/public/images/dark/MaterialSymbolsAddCircle.svg'
import RecipeCard from "@/components/recipeCard"

const HomeWeb = () => {
    const [userDetail, setUserDetail] = useState<UserResponse>({userId:"", profile:{id:"", pseudo:"", avatar:""}, token: "", roleName:""})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSearching, setIsSearching] = useState(false)

    const fetchRecipes = useCallback(async (pageKey: number) => {
        setIsLoading(true)
        try {
        const response = await apiRequest(`/recipes?pageKey=${pageKey}`)
        if(response.status == 200){
            const data: PageRecipe = await response.json()
            setRecipes(data.recipesData)
            setFilteredRecipes(data.recipesData)
            setTotalPages(data.totalPages)
        } else if(response.status == 429){
            setError("Limite de requêtes atteinte. Réessayez demain")
        }
        } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        } finally {
        setIsLoading(false)
        }
    }, [])

    useEffect( () => { 
        async function fetchUser() {
            setLoading(true)
            try {
                const res = await fetch('/api/user', { credentials: 'include' })
                if (res.ok) {
                    const data = await res.json()
                    setUserDetail(data)
                } else {
                    setError(await res.text())
                }
            } catch (error) {
                console.error(error)
            }  finally {
                setLoading(false);
            }
        }
        fetchUser()
        const pageFromUrl = searchParams.get("page")
        const initialPage = pageFromUrl || Number.parseInt(pageFromUrl!) > 0 ? Number.parseInt(pageFromUrl, 10) : 0
        setCurrentPage(initialPage)
        fetchRecipes(initialPage)
    }, [searchParams, fetchRecipes])
    
    const handleSearch = useCallback(() => {
        if (!searchTerm.trim()) {
        setFilteredRecipes(recipes)
        setIsSearching(false)
        return
        }
        setIsSearching(true)
        const filtered = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredRecipes(filtered)
    }, [searchTerm, recipes])

    const resetSearch = useCallback(() => {
        setSearchTerm("")
        setFilteredRecipes(recipes)
        setIsSearching(false)
    }, [recipes])

    const goToPreviousPage = useCallback(() => {
        if (currentPage > 0) {
        const newPage = currentPage - 1
        setCurrentPage(newPage)
        fetchRecipes(newPage)

        // Mettre à jour l'URL
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", newPage.toString())
        router.push(`?${params.toString()}`)

        // Réinitialiser la recherche lors du changement de page
        resetSearch()
        }
    }, [currentPage, fetchRecipes, router, searchParams, resetSearch])

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages - 1) {
        const newPage = currentPage + 1
        setCurrentPage(newPage)
        fetchRecipes(newPage)
        // Mettre à jour l'URL
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", newPage.toString())
        router.push(`?${params.toString()}`)
        // Réinitialiser la recherche lors du changement de page
        resetSearch()
        }
    }, [currentPage, totalPages, fetchRecipes, router, searchParams, resetSearch])

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch()
    }
    if (loading) return <p>Chargement...</p>
    return (
        <>
            <Header icon={logo} iconReverse={logoReverse} iconDescription={"Logo Recipes App"} title={"Recipes App"} hasMenu={true} role={userDetail?.roleName} userInfo={userDetail} />
            <main className="flex flex-col flex-1 px-10 pt-10 pb-36">
                <h1>Liste des recettes</h1>
                {/* Ajouter une recette */}
                {userDetail != null && <div className="my-2">
                    <ButtonLink source={"/web/protected/createRecipe"} name={"Ajouter une recette"} action={"Ajouter"} icon={iconAdd} iconReverse={iconReverseAdd} iconDescription={"icone ajout"} />
                </div>}
                {filteredRecipes.length == 0 && <p className="flex flex-1 justify-center p-40 text-xl">Aucune recette trouvée</p>}
                {error && <p className="text-red-500">{error}</p>}
                {filteredRecipes.length > 0 && <>
                    {/* Barre de recherche */}
                    <form onSubmit={handleSearchSubmit} className="flex gap-2 my-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                type="text"
                                placeholder="Rechercher une recette"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading}>
                            Rechercher
                        </Button>
                        {isSearching && (
                            <Button type="button" variant="outline" onClick={resetSearch} className="flex items-center gap-2 text-black">
                            <X className="h-4 w-4" />
                            Réinitialiser
                            </Button>
                        )}
                    </form>

                    {/* Liste des éléments */}
                    { isLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-lg">Chargement...</div>
                        </div>
                    ) : <div className="flex flex-wrap gap-2 pt-4">
                            {filteredRecipes.map( (recipe) => (
                                <RecipeCard recipe={recipe} />
                            )) }
                        </div>
                    }

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 pt-6">
                        <Button
                            variant="outline"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 0 || isLoading}
                            className="flex items-center gap-2 text-black"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Précédent
                        </Button>

                        <span className="text-sm text-gray-600">
                            Page {currentPage + 1} sur {totalPages}
                        </span>

                        <Button
                            variant="outline"
                            onClick={goToNextPage}
                            disabled={currentPage >= totalPages - 1 || isLoading}
                            className="flex items-center gap-2 text-black"
                        >
                            Suivant
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        </div>
                    )}
                </>}
            </main>
            <Footer/>
        </>
    )
}
export default HomeWeb