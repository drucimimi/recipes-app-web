import { RegisterForm } from "@/components/form/registerForm"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import iconRegister from "@/public/images/light/MaterialSymbolsAppRegistration.svg"
import iconReverseRegister from "@/public/images/dark/MaterialSymbolsAppRegistration.svg"
import ButtonLink from "@/components/ui/buttonLink"
import iconBackLogin from "@/public/images/light/MaterialSymbolsArrowBack.svg"
import iconReverseBackLogin from "@/public/images/dark/MaterialSymbolsArrowBack.svg"
import Footer from "@/components/footer"

const Register = () => {
    return (
        <>
        <Header icon={iconRegister} iconReverse={iconReverseRegister} iconDescription={"Logo inscription"} title={"Inscription"} hasMenu={false} role={""} />
        <main className="flex flex-col items-center justify-center flex-1 px-10 pt-10 pb-36 overflow-auto mb-10">
            <Card>
                <CardHeader>
                    <CardTitle><ButtonLink source={"/web/login"} name={"Retour à la page de connexion"} action={"Retour"} icon={iconReverseBackLogin} iconReverse={iconBackLogin} iconDescription={"Retour à la page de connexion"}></ButtonLink></CardTitle>
                </CardHeader>
                <CardContent>
                    <Link href={"/web/cgu"} className={"md:mx-32 underline"} style={{color: "#0D4A23"}}>Voir les conditions d'utilisation</Link>
                    <RegisterForm />
                </CardContent>
            </Card>
        </main>
        <Footer />
        </>
    )
}
export default Register