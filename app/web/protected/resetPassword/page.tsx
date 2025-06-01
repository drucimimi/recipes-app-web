import { ResetPassForm } from "@/components/form/resetPassForm"
import { decrypt } from "@/services/hashData"
import { cookies } from "next/headers"

const ResetPassword = async () => {
    const session = (await cookies()).get("session")?.value
    const userInfo = session ? await decrypt(session) : null
    const userDetail = userInfo?.userDetail
return (
    <>
    {userDetail && <ResetPassForm userDetail={userDetail}/>}
    </>
)
}
export default ResetPassword