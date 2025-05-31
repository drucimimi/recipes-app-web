"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import ButtonLink from "@/components/ui/buttonLink"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiRequest } from "@/services/httpCall"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import iconResetPass from "@/public/images/light/MaterialSymbolsLockReset.svg"
import iconReverseResetPass from "@/public/images/dark/MaterialSymbolsLockReset.svg"
import iconBackHome from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackHome from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import { UserResponse } from "@/types/definitions"
import HandSpinner from "@/components/ui/handSpinner"

interface ResetPassFormData {
  email: string
  password: string
}

const ResetPassword = () => {
    const router = useRouter()
    const [userDetail, setUserDetail] = useState<UserResponse>({userId:"", profile:{id:"", pseudo:"", avatar:""}, token: "", roleName:""})
    const [loading, setLoading] = useState(true);
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
    const userId = userDetail.userId
    const userToken = userDetail.token
    const [formData, setFormData] = useState<ResetPassFormData>({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const handleInputChange = (field: keyof ResetPassFormData, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await apiRequest(`/user/${userId}`, {method: 'PATCH', headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${userToken}`}, body:{"email":formData.email, "password":formData.password}})
        if(response.status == 200){
            const message = await response.text()
            setCookie("message", message, { secure: true, sameSite: "strict" })
            router.push(`/web/protected/profile`)
        } else if(response.status == 400){
            const data = await response.json()
            setError(data["errors"][0])
            setIsLoading(false)
        } else if(response.status == 404){
            setError("Utilisateur non trouvé")
            setIsLoading(false)
        } else if(response.status == 429){
            setError("Limite de requêtes atteinte. Réessayez demain.")
            setIsLoading(false)
        } else {
            setError("Impossible de changer votre mot de passe")
            setIsLoading(false)
        }
    }
    if (loading) return <HandSpinner />
    if (!userDetail) return <p>Utilisateur non connecté.</p>
    return (
        <>
        <Header icon={iconResetPass} iconReverse={iconReverseResetPass} iconDescription={"Logo réinitialisation"} title={"Changement de mot de passe"} hasMenu={false} role={""} />
        <main className="flex flex-col items-center justify-center flex-1 p-10">
            <Card>
                <CardHeader>
                    <CardTitle><ButtonLink source={"/web/protected/profile"} name={"Retour à la page du profil"} action={"Retour"} icon={iconReverseBackHome} iconReverse={iconBackHome} iconDescription={"Retour à la page du profil"}></ButtonLink></CardTitle>
                </CardHeader>
                <CardContent>
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
                            Changer
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
        <Footer />
        </>
    )
}
export default ResetPassword