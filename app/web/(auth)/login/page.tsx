"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import ButtonLink from "@/components/ui/buttonLink"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import iconBackHome from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackHome from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import { useEffect, useState } from "react"
import init from "@socialgouv/matomo-next"
import Link from "next/link"
import { apiRequest } from "@/services/httpCall"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { deleteCookie, getCookie, setCookie } from "cookies-next"
import iconLogin from "@/public/images/light/MaterialSymbolsLogin.svg"
import iconReverseLogin from "@/public/images/dark/MaterialSymbolsLogin.svg"
import { createSession } from "@/services/authProvider"

interface LoginFormData {
  email: string
  password: string
}

const Login = () => {
    const router = useRouter()
    const MATOMO_URL = process.env.MATOMO_URL || "https://matomo.webapps24.eu"
    const MATOMO_SITE_ID = process.env.MATOMO_SITE_ID || "1"
    useEffect(() => {
        init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID })
    }, [])
    let message = getCookie("message") || null
    setTimeout( () => {
        message != null && deleteCookie("message")
    }, 5000)
    const [formData, setFormData] = useState<LoginFormData>({
            email: "",
            password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await apiRequest('/auth/login', {method: 'POST', headers: {'Content-Type':'application/json'}, body:{"email":formData.email, "password":formData.password}})
        if(response.status == 200){
            const userData = await response.json()
            await createSession(userData)
            router.push(`/web`)
        } else if(response.status == 401){
            setError("Email ou mot de passe incorrect")
            setIsLoading(false)
        } else if(response.status == 403 || response.status == 404){
            setError(await response.text())
            setIsLoading(false)
        } else if(response.status == 429){
            if(response.body != null){
                const data = await response.json()
                setError(data["detail"])
            } else {
                setError("Limite de requêtes atteinte. Réessayez demain.")
            }
            setIsLoading(false)
        } else {
            setError("Impossible de se connecter")
            setIsLoading(false)
        }
    }
    return(
        <>
        <Header icon={iconLogin} iconReverse={iconReverseLogin} iconDescription={"Logo connexion"} title={"Connexion"} hasMenu={false} role={""} />
        <main className="flex flex-col items-center justify-center flex-1 p-10">
            <Card>
                <CardHeader>
                    <CardTitle><ButtonLink source={"/web"} name={"Retour à la page d'accueil"} action={"Retour"} icon={iconReverseBackHome} iconReverse={iconBackHome} iconDescription={"Retour à la page d'accueil"}></ButtonLink></CardTitle>
                </CardHeader>
                <CardContent>
                    {message && <p className="text-green-500">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-6 my-4">
                        {error && <p className="text-red-500">{error}</p>}
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
                        </div>

                        {/* Mot de passe */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                            id="password"
                            type="password"
                            placeholder="Saisir votre mot de passe"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                            />
                        </div>
                        
                        {/* Submit Button */}
                        <Button type="submit" className="bg-green-100 text-green-500" disabled={isLoading}>
                            Se connecter
                        </Button>
                    </form>
                    <Link href={"/web/register"} className="text-green-500 underline">Créer un compte</Link>
                </CardContent>
            </Card>
        </main>
        <Footer />
        </>
    )
}
export default Login