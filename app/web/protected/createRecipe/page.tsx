"use client"

import Header from "@/components/header"
import { apiRequest } from "@/services/httpCall"
import { UserResponse } from "@/types/definitions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import iconAdd from "@/public/images/light/MaterialSymbolsAddCircle.svg"
import iconReverseAdd from "@/public/images/dark/MaterialSymbolsAddCircle.svg"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ButtonLink from "@/components/ui/buttonLink"
import iconBackHome from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackHome from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import HandSpinner from "@/components/ui/handSpinner"

interface RecipeFormData {
  name: string
  duration: string
  recipients: string
  instructions: string
  image: any
}

const CreateRecipe = () => {
    const router = useRouter()
    const [userDetail, setUserDetail] = useState<UserResponse>({userId:"", profile:{id:"", pseudo:"", avatar:""}, token: "", roleName:""})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    useEffect( () => {
        async function fetchUser() {
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
    const [formData, setFormData] = useState<RecipeFormData>({
        name: "",
        duration: "00:30:00",
        recipients: "Ingrédient1\nIngrédient2\nIngrédient3",
        instructions: "Instruction1\nInstruction2\nInstruction3",
        image: null
    })
    const [isLoading, setIsLoading] = useState(false)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({...prev, "image":file}))
    }
    const handleInputChange = (field: keyof RecipeFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const formRecipeData = new FormData()
        formRecipeData.append("image", formData.image)
        formRecipeData.append("name", formData.name)
        formRecipeData.append("duration", formData.duration)
        formRecipeData.append("recipients", formData.recipients)
        formRecipeData.append("instructions", formData.instructions)
        if(formData.image == null){
            setError("L'image ne peut pas être vide")
            setIsLoading(false)
            return
        }
        if(!formRecipeData.get("recipients")?.toString().includes("\n")){
            setError("Il doit avoir un ingrédient par ligne")
            setIsLoading(false)
            return
        }
        const response = await apiRequest(`/recipes/${userDetail.userId}`, {method: 'POST', headers: {'Authorization': `Bearer ${userDetail.token}`}, body:formRecipeData}, true)
        if(response.ok){
            router.push("/web")
        } else if(response.status == 400){
            const data = await response.json()
            setError(data["errors"][0])
            setIsLoading(false)
        } else if(response.status == 429){
            setError("Limite de requêtes atteinte. Réessayez demain.")
            setIsLoading(false)
        } else {
            setError("Impossible de créer la recette")
            setIsLoading(false)
        }
    }
    if (loading) return <HandSpinner />
    if (!userDetail) return <p>Utilisateur non connecté.</p>
    return (
        <>
        <Header icon={iconAdd} iconReverse={iconReverseAdd} iconDescription={"Logo ajout"} title={"Ajouter une recette"} hasMenu={false} role="" />
        <main className="flex flex-col items-center justify-center flex-1 p-10 mb-20">
            <Card>
                <CardHeader>
                    <CardTitle><ButtonLink source={"/web"} name={"Retour à la page d'accueil"} action={"Retour"} icon={iconReverseBackHome} iconReverse={iconBackHome} iconDescription={"Retour à la page du profil"}></ButtonLink></CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6 my-4">
                        {error && <p className="text-red-500">{error}</p>}
                        {/* Nom */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nom de recette</Label>
                            <Input
                            id="name"
                            type="text"
                            placeholder="Saisir un nom de recette"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            />
                            <p>Le nom de recette doit contenir entre 3 et 50 caractères</p>
                        </div>

                        {/* Durée */}
                        <div className="space-y-2">
                            <Label htmlFor="duration">Durée</Label>
                            <select value={formData.duration} onChange={(e) => handleInputChange("duration", e.target.value)} className="ml-2" id="duration">
                                <option value="" disabled>Sélectionnez une durée</option>
                                <option value="00:00:00">00:00:00</option>
                                <option value="00:10:00">00:10:00</option>
                                <option value="00:20:00">00:20:00</option>
                                <option value="00:30:00">00:30:00</option>
                                <option value="00:40:00">00:40:00</option>
                                <option value="00:50:00">00:50:00</option>
                                <option value="01:00:00">01:00:00</option>
                                <option value="01:10:00">01:10:00</option>
                                <option value="01:20:00">01:20:00</option>
                                <option value="01:30:00">01:30:00</option>
                                <option value="01:40:00">01:40:00</option>
                                <option value="01:50:00">01:50:00</option>
                                <option value="02:00:00">02:00:00</option>
                            </select>
                            <p>Vous devez sélectionner une durée</p>
                        </div>

                        {/* Image */}
                        <div className="space-y-2">
                            <Label htmlFor="avatar">Image</Label>
                            <div className="flex items-center gap-2">
                                <Input id="avatar" type="file" onChange={handleFileChange} className="cursor-pointer" />
                                <Upload className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p>Vous devez sélectionner une image</p>
                            {formData.image != null && (
                            <p className="text-xs text-muted-foreground">Fichier sélectionné: {formData.image.name}</p>
                            )}
                        </div>

                        {/* Ingrédients */}
                        <div className="space-y-2">
                            <Label htmlFor="recipients">Ingrédients</Label>
                            <Textarea value={formData.recipients} onChange={(e) => handleInputChange("recipients", e.target.value)} id="recipients" rows={5}/>
                            <p>Saisir un ingrédient par ligne</p>
                        </div>

                        {/* Instructions */}
                         <div className="space-y-2">
                            <Label htmlFor="instructions">Instructions</Label>
                            <Textarea value={formData.instructions} onChange={(e) => handleInputChange("instructions", e.target.value)} id="instructions" rows={8}/>
                            <p>Saisir une instruction par ligne</p>
                        </div>
                        
                        {/* Submit Button */}
                        <Button type="submit" className="bg-green-100 text-green-500" disabled={isLoading}>
                            Enregistrer
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
        <Footer />
        </>
    )
}
export default CreateRecipe