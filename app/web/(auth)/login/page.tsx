import { LoginForm } from "@/components/form/loginForm"
import Header from "@/components/header"
import iconLogin from "@/public/images/light/MaterialSymbolsLogin.svg"
import iconReverseLogin from "@/public/images/dark/MaterialSymbolsLogin.svg"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ButtonLink from "@/components/ui/buttonLink"
import iconBackHome from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackHome from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import Footer from "@/components/footer"
import Link from "next/link"

const Login = () => {
    return (
        <>
        <Header icon={iconLogin} iconReverse={iconReverseLogin} iconDescription={"Logo connexion"} title={"Connexion"} hasMenu={false} role={""} />
        <main className="flex flex-col items-center justify-center flex-1 p-10">
            <Card>
                <CardHeader>
                    <CardTitle><ButtonLink source={"/web"} name={"Retour à la page d'accueil"} action={"Retour"} icon={iconReverseBackHome} iconReverse={iconBackHome} iconDescription={"Retour à la page d'accueil"}></ButtonLink></CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                    <Link href={"/web/register"} className="underline" style={{color: "#0D4A23"}}>Créer un compte</Link>
                </CardContent>
            </Card>
        </main>
        <Footer />
        </>
)
}
export default Login