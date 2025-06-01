import { ProfileForm } from "@/components/form/profileForm"
import { decrypt } from "@/services/hashData"
import { CookiesProfileAndSession } from "@/types/definitions"
import { cookies } from "next/headers"

const Profile = async () => {
   const apiUrl = process.env.API_URL ?? ""
   const session = (await cookies()).get("session")?.value ?? ""
   const userInfo = await decrypt(session)
   if(userInfo?.userDetail){
      const cookiesProfileAndSession:CookiesProfileAndSession = {
         pseudo: (await cookies()).get("pseudo")?.value ?? "",
         avatar: (await cookies()).get("avatar")?.value ?? `${apiUrl}/images/default/default-profile-image.jpg`,
         userDetail: userInfo?.userDetail
      }
      return (
         <>
         {userInfo?.userDetail && <ProfileForm {...cookiesProfileAndSession}/>}
         </>
      )
   }
}
export default Profile