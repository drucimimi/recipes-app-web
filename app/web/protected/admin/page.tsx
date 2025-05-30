"use client"
import Header from "@/components/header"
import { apiRequest } from "@/services/httpCall"
import { Recipe, UserResponse } from "@/types/definitions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import iconDashboard from "@/public/images/light/MaterialSymbolsDashboard.svg"
import iconReverseDashboard from "@/public/images/dark/MaterialSymbolsDashboard.svg"
import iconEye from "@/public/images/light/MaterialSymbolsVisibilityRounded.svg"
import iconReverseEye from "@/public/images/dark/MaterialSymbolsVisibilityRounded.svg"
import iconApprove from "@/public/images/light/MaterialSymbolsCheck.svg"
import iconReverseApprove from "@/public/images/dark/MaterialSymbolsCheck.svg"
import iconReject from "@/public/images/light/LineMdRemove.svg"
import iconReverseReject from "@/public/images/dark/LineMdRemove.svg"
import Footer from "@/components/footer"
import Icon from "@/components/ui/icon"
import { Button } from "@/components/ui/button"
import { setCookie } from "cookies-next"

const Admin = () => {
    const router = useRouter()
    const [userDetail, setUserDetail] = useState<UserResponse>({userId:"", profile:{id:"", pseudo:"", avatar:""}, token: "", roleName:""})
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    useEffect( () => {
        async function fetchPendingRecipes(userDetail:UserResponse){
            try{
                const response = await apiRequest('/admin/recipes', {headers: {'Authorization': `Bearer ${userDetail.token}`}})
                if(response.status == 200){
                    const data = await response.json()
                    setRecipes(data)
                } else if(response.status == 429){
                    setError("Limite de requêtes atteinte. Réessayez demain.")
                }
            } catch (error){
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        async function fetchUser() {
            try {
                const res = await fetch('/api/user', { credentials: 'include' })
                if (res.ok) {
                    const data = await res.json()
                    setUserDetail(data)
                    fetchPendingRecipes(data)
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
    }, [])
    const redirectToRecipePage = (recipe:Recipe) => {
        setCookie("recipe", JSON.stringify(recipe))
        router.push(`/web/recipe/${recipe.id}`)
    }
    const handleSubmit = async (e: React.FormEvent, recipeId:string, isApproved:boolean) => {
        e.preventDefault()
        setIsLoading(true)
        const response = isApproved ? 
            await apiRequest(`/admin/recipes/${recipeId}/status`, {method: 'PATCH', headers: {'Authorization': `Bearer ${userDetail.token}`}})
            : await apiRequest(`/admin/recipes/${recipeId}/status`, {method: 'DELETE', headers: {'Authorization': `Bearer ${userDetail.token}`}})
        if(response.ok){
            router.push(`/web`)
        } else if(response.status == 404){
            setError(await response.text())
            setIsLoading(false)
        } else if(response.status == 429){
            setError("Limite de requêtes atteinte. Réessayez demain.")
            setIsLoading(false)
        } else {
            setError(isApproved ? "Impossible d'approuver la recette" : "Impossible de rejeter la recette")
            setIsLoading(false)
        }
    }
    if (loading) return <p>Chargement...</p>
    if (!userDetail) return <p>Utilisateur non connecté.</p>
    return (
        <>
        <Header icon={iconDashboard} iconReverse={iconReverseDashboard} iconDescription={"Logo tableau de bord"} title={"Administration"} hasMenu={true} role={userDetail?.roleName} userInfo={userDetail} />
        <main className="flex flex-col flex-1 p-10">
            {recipes.length == 0 && <p className="flex flex-1 justify-center p-40 text-xl">Aucune recette en cours d'approbation</p>}
            {error && <p className="text-red-500">{error}</p>}
            {recipes.length > 0 && <>
                <h1>Liste des recettes en cours d'approbation</h1>
                <div className="flex flex-col gap-2">
                    { recipes.map( (recipe) => (
                        <div className="flex flex-wrap gap-2 items-center mt-2" key={recipe.id}>
                            <p>{recipe.name}</p>
                            <Button type="button" onClick={() => redirectToRecipePage(recipe)}><Icon image={iconEye} imageReverse={iconReverseEye} description={"icone de visibilité"} /></Button>
                            <Button type="button" onClick={(e) => handleSubmit(e, recipe.id, true)} disabled={isLoading}><Icon image={iconApprove} imageReverse={iconReverseApprove} description={"icone de validation"} /></Button>
                            <Button type="button" onClick={(e) => handleSubmit(e, recipe.id, false)} disabled={isLoading}><Icon image={iconReject} imageReverse={iconReverseReject} description={"icone de suppression sous forme de croix"} /></Button>
                        </div>
                    ))}
                </div>
            </>}
        </main>
        <Footer />
        </>
    )
}
export default Admin