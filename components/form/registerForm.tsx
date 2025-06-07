"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import init from "@socialgouv/matomo-next"
import { Upload } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import iconRegister from "@/public/images/light/MaterialSymbolsAppRegistration.svg"
import iconReverseRegister from "@/public/images/dark/MaterialSymbolsAppRegistration.svg"
import ButtonLink from "@/components/ui/buttonLink"
import iconBackLogin from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackLogin from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import { apiRequest } from "@/services/httpCall"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import styles from "@/app/ui/styles/registerForm.module.css"

interface RegisterFormData {
  avatar: any
  pseudo: string
  email: string
  password: string
  acceptCgu: boolean
}

/** 
 * @description Composant client pour la page d'inscription de compte utilisateur
*/
export const RegisterForm = () => {
    const router = useRouter()
    const MATOMO_URL = process.env.MATOMO_URL || "https://matomo.webapps24.eu"
    const MATOMO_SITE_ID = process.env.MATOMO_SITE_ID || "1"
    useEffect(() => {
        init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
    }, [])
    const [formData, setFormData] = useState<RegisterFormData>({
        avatar: null,
        pseudo: "",
        email: "",
        password: "",
        acceptCgu: false,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null
        setFormData((prev) => ({ ...prev, "avatar":file }))
    }
    const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        if(!formData.acceptCgu){
            setError("Vous devez accepter les conditions d'utilisation")
            setIsLoading(false)
            return
        }
        const formRegisterData = new FormData()
        formRegisterData.append("avatar", formData.avatar)
        formRegisterData.append("pseudo", formData.pseudo)
        formRegisterData.append("email", formData.email)
        formRegisterData.append("password", formData.password)
        const response = await apiRequest('/auth/register', {method: 'POST', body:formRegisterData}, true)
        if(response.status == 201){
            const message = await response.text()
            setCookie("message", message, { secure: true, sameSite: "strict" })
            router.push(`/web/login`)
        } else if(response.status == 400){
            const data = await response.json()
            setError(data["errors"][0])
            setIsLoading(false)
        } else if(response.status == 409){
            const data = await response.json()
            setError(data["message"])
            setIsLoading(false)
        } else if(response.status == 429){
            setError("Limite de requêtes atteinte. Réessayez demain.")
            setIsLoading(false)
        } else {
            setError("Impossible de créer l'utilisateur")
            setIsLoading(false)
        }
    }

    return (
        <>
        <Header icon={iconRegister} iconReverse={iconReverseRegister} iconDescription={"Logo inscription"} title={"Inscription"} hasMenu={false} role={""} />
        <main className="flex flex-col items-center justify-center flex-1 p-10 overflow-auto mb-10">
            <Card>
                <CardHeader>
                    <CardTitle><ButtonLink source={"/web/login"} name={"Retour à la page de connexion"} action={"Retour"} icon={iconReverseBackLogin} iconReverse={iconBackLogin} iconDescription={"Retour à la page de connexion"}></ButtonLink></CardTitle>
                </CardHeader>
                <CardContent>
                    <Link href={"/web/cgu"} className={styles.registerFormLink}>Voir les conditions d'utilisation</Link>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-4" encType="multipart/form-data">
                        {error && <p style={{color: "#830B0B"}}>{error}</p>}
                    {/* Avatar */}
                        <div className="space-y-2">
                            <Label htmlFor="avatar">Avatar</Label>
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
                            placeholder="Saisir votre pseudo"
                            value={formData.pseudo}
                            onChange={(e) => handleInputChange("pseudo", e.target.value)}
                            />
                            <p>Le pseudo doit contenir entre 3 et 50 caractères</p>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            id="email"
                            type="email"
                            placeholder="Saisir votre email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            />
                            <p>L'email doit être au format caracteresalpanum@domain.tld</p>
                        </div>

                        {/* Mot de passe */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                            id="password"
                            type="password"
                            placeholder="Créer votre mot de passe"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                            />
                            <p>Le mot de passe doit contenir au moins 8 caractères. Pour un mot de passe robuste : au moins une lettre majuscule, un chiffre et un caractère spécial</p>
                        </div>

                        {/* Accepter les CGU */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                            id="acceptCgu"
                            checked={formData.acceptCgu}
                            onCheckedChange={(checked) => handleInputChange("acceptCgu", !!checked)}
                            />
                            <Label
                            htmlFor="acceptCgu"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                            J'accepte les conditions d'utilisation ci-dessus
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button type="submit" className={styles.registerFormBtn} disabled={isLoading}>
                            S'inscrire
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
        <Footer />
        </>
    )
}