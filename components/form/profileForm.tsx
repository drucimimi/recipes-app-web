"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { apiRequest } from "@/services/httpCall"
import Header from "@/components/header"
import Footer from "@/components/footer"
import iconProfile from "@/public/images/light/MaterialSymbolsAccountCircle.svg"
import iconReverseProfile from "@/public/images/dark/MaterialSymbolsAccountCircle.svg"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import ButtonLink from "@/components/ui/buttonLink"
import iconResetPass from "@/public/images/light/MaterialSymbolsLockReset.svg"
import iconReverseResetPass from "@/public/images/dark/MaterialSymbolsLockReset.svg"
import Image from "next/image"
import { CustomDialog } from "@/components/custom-dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { CookiesProfileAndSession } from "@/types/definitions"
import { deleteSessionCookie } from "@/services/authProvider"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

interface ProfileFormData {
  avatar: any
  pseudo: string
}

/** 
 * @param pseudo
 * @param avatar
 * @param userDetail
 * @description Composant client pour la page du profil utilisateur
*/
export const ProfileForm = ({pseudo, avatar, userDetail}:CookiesProfileAndSession) => {
    const router = useRouter()
    const message = getCookie("message") || null
    setTimeout( () => {
        message != null && deleteCookie("message")
    }, 5000)
    const [formData, setFormData] = useState<ProfileFormData>({
        avatar: null,
        pseudo: ""
    })
    const [newPseudo, setNewPseudo] = useState<string>(pseudo ?? "")
    const [newAvatar, setNewAvatar] = useState<string>(avatar ?? "")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    let fileInput: HTMLInputElement | null = null
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({...prev, "avatar":file}))
    }
    const handleInputChange = (field: keyof ProfileFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const formProfileData = new FormData()
        formProfileData.append("avatar", formData.avatar)
        formProfileData.append("pseudo", formData.pseudo)
        try {
            const response = await apiRequest(`/profile/${userDetail?.profile.id}`, {method: 'PUT', headers: { 'Authorization': `Bearer ${userDetail?.token}`}, body:formProfileData}, true)
            if(response.status == 200){
                const data = await response.json()
                setCookie("pseudo", data["pseudo"])
                setCookie("avatar", data["avatar"])
                setNewPseudo(data["pseudo"])
                setNewAvatar(data["avatar"])
                setError("")
                setSuccess("Votre profil a été modifié avec succès")
                setIsLoading(false)
            } else if(response.status == 400){
                const data = await response.json()
                setError(data["errors"][0])
                setIsLoading(false)
            } else if(response.status == 404){
                const data = await response.json()
                setError(data["error"])
                setIsLoading(false)
            } else if(response.status == 429){
                setError("Limite de requêtes atteinte. Réessayez demain.")
                setIsLoading(false)
            } else {
                setError("Impossible de mettre à jour le profil utilisateur")
                setIsLoading(false)
            }

        } catch(error){
            console.error(error)
        }
    }
    const deleteAccount = async () => {
        const response = await apiRequest(`/user/${userDetail?.userId}`, { method: 'DELETE', headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${userDetail?.token}`}})
        if(response.status == 200){
            await deleteSessionCookie()
            deleteCookie("pseudo")
            deleteCookie("avatar")
            deleteCookie("recipe")
            router.push('/web')
        } else {
            setError("Impossible de supprimer l'utilisateur")
        }
    }
    return (
        <>
        <Header icon={iconProfile} iconReverse={iconReverseProfile} iconDescription={"Logo compte utilisateur"} title={"Mon profil"} hasMenu={true} role={userDetail?.roleName} userInfo={userDetail} />
        <main className="flex flex-col items-center justify-center flex-1 p-10 mb-20 overflow-auto">
            <Card>
                <CardContent>
                    {message && <p style={{color: "#0D4A23"}}>{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 my-4">
                        {success && <p className="text-green-500">{success}</p>}
                        {error && <p style={{color: "#830B0B"}}>{error}</p>}
                        {/* Avatar */}
                        <div className="space-y-2">
                            <Label htmlFor="avatar">Avatar</Label>
                            <Image src={!newAvatar.includes("default") ? newAvatar : userDetail?.profile.avatar.replace("10.0.2.2", "localhost")} alt={"avatar"} width={200} height={200}/>
                            <div className="flex items-center gap-2">
                            <Input id="avatar" type="file" onChange={handleFileChange} className="cursor-pointer" />
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            </div>
                            {formData.avatar != null && (
                            <p className="text-xs text-muted-foreground">Fichier sélectionné: {formData.avatar.name}</p>
                            )}
                        </div>

                        {/* Pseudo */}
                        <div className="space-y-2">
                            <Label htmlFor="pseudo">Pseudo</Label>
                            <Input
                            id="pseudo"
                            type="text"
                            placeholder={newPseudo != "" ? newPseudo : userDetail?.profile.pseudo}
                            value={formData.pseudo}
                            onChange={(e) => handleInputChange("pseudo", e.target.value)}
                            />
                            <p>Le pseudo doit contenir entre 3 et 50 caractères</p>
                        </div>
                        
                        {/* Submit Button */}
                        <Button type="submit" className="bg-green-100" style={{color: "#0D4A23"}} disabled={isLoading}>
                            Enregistrer
                        </Button>
                    </form>

                    {/* Change Password ButtonLink */}
                    <ButtonLink source={"/web/protected/resetPassword"} name={"Changer le mot de passe"} action={"Changer"} icon={iconReverseResetPass} iconReverse={iconResetPass} iconDescription={"Logo réinitialisation"}></ButtonLink>
                    
                    {/* Delete Account Button and Dialog */}
                    <CustomDialog
                        trigger={<Button variant="destructive" style={{backgroundColor:"#830B0B", color: "FFFFFF"}}>Supprimer le compte</Button>}
                        title="Suppression du compte"
                        footer={<div className="flex justify-end gap-2 w-full">
                        <Button variant="destructive" style={{backgroundColor:"#830B0B", color: "FFFFFF"}} onClick={deleteAccount}>Oui</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Non</Button>
                        </DialogClose>
                        </div>}>
                        <p>
                        Etes-vous sur de vouloir supprimer ?
                        </p>
                    </CustomDialog> 
                </CardContent>
            </Card>
        </main>
        <Footer />
        </>
    )
}