"use client"
import { Button } from "@/components/ui/button"
import iconEye from "@/public/images/light/MaterialSymbolsVisibilityRounded.svg"
import iconReverseEye from "@/public/images/dark/MaterialSymbolsVisibilityRounded.svg"
import iconApprove from "@/public/images/light/MaterialSymbolsCheck.svg"
import iconReverseApprove from "@/public/images/dark/MaterialSymbolsCheck.svg"
import iconReject from "@/public/images/light/LineMdRemove.svg"
import iconReverseReject from "@/public/images/dark/LineMdRemove.svg"
import Icon from "@/components/ui/icon"
import { Recipe, UserResponse } from "@/types/definitions"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import { apiRequest } from "@/services/httpCall"

 export const PendingApprovalRecipes = ({recipe, userDetail}:{recipe:Recipe, userDetail:UserResponse}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const redirectToRecipePage = (recipe:Recipe) => {
        router.push(`/web/recipe/${recipe.id}`)
    }
    const handleSubmit = async (e: React.FormEvent, recipeId:string, isApproved:boolean) => {
        e.preventDefault()
        setIsLoading(true)
        const response = isApproved ? 
            await apiRequest(`/admin/recipes/${recipeId}/status`, {method: 'PATCH', headers: {'Authorization': `Bearer ${userDetail?.token}`}})
            : await apiRequest(`/admin/recipes/${recipeId}/status`, {method: 'DELETE', headers: {'Authorization': `Bearer ${userDetail?.token}`}})
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
    return (
        <>
        <p>{error}</p>
        <div className="flex flex-wrap gap-2 items-center mt-2">
            <p>{recipe.name}</p>
            <Button type="button" onClick={() => redirectToRecipePage(recipe)}><Icon image={iconEye} imageReverse={iconReverseEye} description={"icone de visibilité"} /></Button>
            <Button type="button" onClick={(e) => handleSubmit(e, recipe.id, true)} disabled={isLoading}><Icon image={iconApprove} imageReverse={iconReverseApprove} description={"icone de validation"} /></Button>
            <Button type="button" onClick={(e) => handleSubmit(e, recipe.id, false)} disabled={isLoading}><Icon image={iconReject} imageReverse={iconReverseReject} description={"icone de suppression sous forme de croix"} /></Button>
        </div>
        </>
    )
 }