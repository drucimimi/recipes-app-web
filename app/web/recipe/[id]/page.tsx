import { Recipe } from "@/types/definitions"
import iconDetail from "@/public/images/light/IconParkOutlineDocDetail.svg"
import iconReverseDetail from "@/public/images/dark/IconParkOutlineDocDetail.svg"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import ButtonLink from "@/components/ui/buttonLink"
import iconBackHome from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackHome from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import { CustomDialog } from "@/components/custom-dialog"
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { apiRequest } from "@/services/httpCall"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cookies } from "next/headers"
import { decrypt } from "@/services/hashData"
import { BtnConfirmDelete } from "@/components/btnConfirmDelete"

type PageProps = {
  params: Promise<{ id: string }>;
}

const GetRecipe = async ({params}:PageProps) => {
    const {id } = await params
    let detailRecipe
    // Récupération des détails de la recette
    try {
        const response = await apiRequest(`/recipes/${id}`, {headers: {'Content-Type': 'application/json'}})
        if(response.ok){
            const data = await response.json()
            if(data.name == null){
                return <p className="flex justify-center mt-40 text-lg">La recette demandée n'existe pas</p>
            } else {
                detailRecipe = data as Recipe
            }
        }
    } catch (error){
        console.error(error)
    }
    const session = (await cookies()).get("session")?.value
    const userInfo = session ? await decrypt(session) : null
    const userDetail = userInfo?.userDetail
    let error = ""
    return (
        <>
         <Header icon={iconDetail} iconReverse={iconReverseDetail} iconDescription={"Logo détail du document"} title={`Recette ${detailRecipe?.name}`} hasMenu={false} role="" />
         <main className="flex flex-col flex-1 p-10 items-center mb-20 overflow-auto">
            <Card>
                <CardTitle>
                    <ButtonLink source={"/web"} name={"Retour à la page d'accueil"} action={"Retour"} icon={iconReverseBackHome} iconReverse={iconBackHome} iconDescription={"Retour à la page d'accueil"}></ButtonLink>
                </CardTitle>
                { detailRecipe && <CardContent>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="space-y-2">
                        <Image src={detailRecipe.image.replace("10.0.2.2", "localhost")} alt={detailRecipe.name} width={200} height={200}/>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl">{detailRecipe.name}</h1>
                        <p>Durée : {detailRecipe.durationFormatted}</p>
                        <p>Créée par {detailRecipe.author} le {detailRecipe.createdDate}</p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl">Ingrédients :</h2>
                        <ul>
                            {detailRecipe.recipients.map((recipient, index) => (
                                <li key={index}>{recipient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl">Instructions :</h2>
                        {detailRecipe.instructions.split("\n").map( (instruction, index) => (
                            <p key={index}>{instruction}</p>
                        ))}
                    </div>
                    {detailRecipe.userId == userDetail?.userId && <div className="space-y-2">
                        <CustomDialog
                                trigger={<Button variant="destructive">Supprimer la recette</Button>}
                                title={`Supprimer la recette ${detailRecipe.name}`}
                                footer={<div className="flex justify-end gap-2 w-full">
                                <BtnConfirmDelete id={id} error={error} userDetail={userDetail} />
                                <DialogClose asChild>
                                    <Button variant="outline">Non</Button>
                                </DialogClose>
                                </div>}>
                                <p>
                                Etes-vous sur de vouloir supprimer ?
                                </p>
                            </CustomDialog> 
                    </div>}
                </CardContent>}
            </Card>
         </main>
         <Footer />
        </>
    )
}
export default GetRecipe