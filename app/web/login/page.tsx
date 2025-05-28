"use client"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { useSearchParams } from "next/navigation"

const Login = () => {
    const searchParams = useSearchParams()
    const message = searchParams.get("message")
    return(
        <>
        <Header icon={""} iconReverse={""} iconDescription={"Logo connexion"} title={"Connexion"} hasMenu={false} role={""} />
        <main>
            {message && <p>{message}</p>}
        </main>
        <Footer />
        </>
    )
}
export default Login