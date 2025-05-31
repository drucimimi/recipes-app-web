"use client"
import { Recipe, UserResponse } from "@/types/definitions"
import { getCookie } from "cookies-next"
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
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import HandSpinner from "@/components/ui/handSpinner"

const GetRecipe = () => {
    const detailRecipeString = getCookie("recipe")
    if(detailRecipeString == null){
        return <p className="flex justify-center mt-40 text-lg">La recette demandée n'existe pas</p>
    }
    const router = useRouter()
    const [userDetail, setUserDetail] = useState<UserResponse>({userId:"", profile:{id:"", pseudo:"", avatar:""}, token: "", roleName:""})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
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
    }, [])
    const detailRecipe:Recipe = detailRecipeString != null && JSON.parse(detailRecipeString)

    const deleteRecipe = async () => {
        const response = await apiRequest(`/recipes/${detailRecipe.id}`, {method:"DELETE", headers: {'Authorization': `Bearer ${userDetail.token}`}})
        if(response.ok){
            router.push("/web")
        } else {
            setError("Impossible de supprimer la recette")
        }
    }
    if (loading) return <HandSpinner />
    return (
        <>
         <Header icon={iconDetail} iconReverse={iconReverseDetail} iconDescription={"Logo détail du document"} title={`Recette ${detailRecipe.name}`} hasMenu={false} role="" />
         <main className="flex flex-col flex-1 p-10 items-center mb-20 overflow-auto">
            <Card>
                <CardTitle>
                    <ButtonLink source={"/web"} name={"Retour à la page d'accueil"} action={"Retour"} icon={iconReverseBackHome} iconReverse={iconBackHome} iconDescription={"Retour à la page d'accueil"}></ButtonLink>
                </CardTitle>
                <CardContent>
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
                            {detailRecipe.recipients.map((recipient) => (
                                <li>{recipient}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl">Instructions :</h2>
                        {detailRecipe.instructions.split("\n").map( (instruction) => (
                            <p>{instruction}</p>
                        ))}
                    </div>
                    {detailRecipe.userId == userDetail?.userId && <div className="space-y-2">
                        <CustomDialog
                                trigger={<Button variant="destructive">Supprimer la recette</Button>}
                                title={`Supprimer la recette ${detailRecipe.name}`}
                                footer={<div className="flex justify-end gap-2 w-full">
                                <Button variant="destructive" onClick={deleteRecipe}>Oui</Button>
                                <DialogClose>
                                    <Button variant="outline">Non</Button>
                                </DialogClose>
                                </div>}>
                                <p>
                                Etes-vous sur de vouloir supprimer ?
                                </p>
                            </CustomDialog> 
                    </div>}
                </CardContent>
            </Card>
         </main>
         <Footer />
        </>
    )
}
export default GetRecipe