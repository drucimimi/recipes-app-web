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
import { apiRequest } from "@/services/httpCall"

/**
 * 
 * @param recipe
 * @param userDetail
 * @description permet d'afficher sous forme d'élément de liste les infos clé d'une recette en cours d'approbation
 * @example
 * ```
  const session = (await cookies.get('session))?.value
  const sessionInfo = session ? await decrypt(session) : null
  const userDetail = sessionInfo?.userDetail
  const response = await apiRequest('/admin/recipes', {headers:{'Content-Type':'application/json', 'Authorization': 'Bearer tokenAdmin....'}})
  let recipesData :Recipe[] = []
  if(response.status == 200){
    recipesData = await response.json()
  } else {
    console.error(response.statusText)
  }
    return (
        { userDetail && recipesData ? recipesData.map( recipe => (
            <PendingApprovalRecipes recipe={recipe} userDetail={userDetail} />
        )) : null}
    )
    ```
 */
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
            router.refresh()
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
        {error && <p style={{color: "#F69C9C"}}>{error}</p>}
        <div className="flex flex-wrap gap-2 items-center mt-2">
            <p>{recipe.name}</p>
            <Button type="button" onClick={() => redirectToRecipePage(recipe)}><Icon image={iconEye} imageReverse={iconReverseEye} description={"icone de visibilité"} /></Button>
            <Button type="button" onClick={(e) => handleSubmit(e, recipe.id, true)} disabled={isLoading}><Icon image={iconApprove} imageReverse={iconReverseApprove} description={"icone de validation"} /></Button>
            <Button type="button" onClick={(e) => handleSubmit(e, recipe.id, false)} disabled={isLoading}><Icon image={iconReject} imageReverse={iconReverseReject} description={"icone de suppression sous forme de croix"} /></Button>
        </div>
        </>
    )
 }