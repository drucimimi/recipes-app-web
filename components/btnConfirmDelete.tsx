"use client"
import { redirect } from "next/navigation"
import { Button } from "./ui/button"
import { apiRequest } from "@/services/httpCall"
import { UserResponse } from "@/types/definitions"

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
        <Button variant="destructive" onClick={deleteRecipe}>Oui</Button>
    )
}