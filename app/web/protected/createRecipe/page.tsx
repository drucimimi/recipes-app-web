import { CreateRecipeForm } from "@/components/form/createRecipeForm"
import { decrypt } from "@/services/hashData"
import { cookies } from "next/headers"

const CreateRecipe = async () => {
    const session = (await cookies()).get("session")?.value
    const userInfo = session ? await decrypt(session) : null
    const userDetail = userInfo?.userDetail

    return (
        <>
        {userDetail && <CreateRecipeForm userDetail={userDetail} />}
        </>
    )
}
export default CreateRecipe