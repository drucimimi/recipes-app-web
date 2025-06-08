"use client"
import { redirect } from "next/navigation"
import { Button } from "../ui/button"
import { apiRequest } from "@/services/httpCall"
import { UserResponse } from "@/types/definitions"
/**
 * 
 * @param id
 * @param error
 * @param userDetail
 * @description bouton de confirmation de la popup de suppression qui supprime un élément (ex: une recette)
 * @example
 * ```
    const session = (await cookies.get('session))?.value
    const sessionInfo = session ? await decrypt(session) : null
    const userDetail = sessionInfo?.userDetail
    const recipe = {id:'1ab2c3d4e5f6g7h8i9', name:'recette de test', duration:'00:20:00', durationFormatted:'20min', ....}
    return ( <BtnConfirmDelete id={recipe.id} error={''} userDetail={userDetail}/> )
    ```
 */
export const BtnConfirmDelete = ({id, error, userDetail}:{id:string, error:string, userDetail:UserResponse}) => {
    const deleteRecipe = async () => {
        const response = await apiRequest(`/recipes/${id}`, {method:"DELETE", headers: {'Authorization': `Bearer ${userDetail?.token}`}})
        if(response.ok){
            redirect('/web')
        } else {
            error = "Impossible de supprimer la recette"
        }
    }
    return (
        <Button variant="destructive" style={{backgroundColor:"#830B0B", color: "FFFFFF"}} onClick={deleteRecipe}>Oui</Button>
    )
}