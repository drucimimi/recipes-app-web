import Header from "@/components/header"
import { Recipe } from "@/types/definitions"
import iconDashboard from "@/public/images/light/MaterialSymbolsDashboard.svg"
import iconReverseDashboard from "@/public/images/dark/MaterialSymbolsDashboard.svg"
import Footer from "@/components/footer"
import { PendingApprovalRecipes } from "@/components/pendingApprovalRecipes"
import { cookies } from "next/headers"
import { decrypt } from "@/services/hashData"
import { apiRequest } from "@/services/httpCall"

const Admin = async () => {
   const session = (await cookies()).get("session")?.value
    const userInfo = session ? await decrypt(session) : null
    const userDetail = userInfo?.userDetail
    let recipes:Recipe[] = []
    let error = ""

    try{
        const response = await apiRequest('/admin/recipes', {headers: {'Authorization': `Bearer ${userDetail?.token}`}})
        if(response.status == 200){
            const data = await response.json()
            recipes = data
        } else if(response.status == 429){
            error = "Limite de requêtes atteinte. Réessayez demain."
        }
    } catch (error){
        console.error(error)
    }

    return (
        <>
        <Header icon={iconDashboard} iconReverse={iconReverseDashboard} iconDescription={"Logo tableau de bord"} title={"Administration"} hasMenu={true} role={userDetail?.roleName ?? ""} userInfo={userDetail} />
        { userDetail && <main className="flex flex-col flex-1 p-10">
            {recipes.length == 0 && <p className="flex flex-1 justify-center p-40 text-xl">Aucune recette en cours d'approbation</p>}
            {recipes.length > 0 && <>
                <h1>Liste des recettes en cours d'approbation</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col gap-2">
                    { recipes.map( (recipe) => (
                        <PendingApprovalRecipes recipe={recipe} userDetail={userDetail} key={recipe.id} />
                    ))}
                </div>
            </>}
        </main>}
        <Footer />
        </>
    )
}
export default Admin