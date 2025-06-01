import { decrypt } from "@/services/hashData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const session = request.cookies.get('session')?.value ?? ""
        const userInfo =  await decrypt(session)
        const userDetail = userInfo?.userDetail
        const response = await fetch('http://localhost:8080/api/auth/logout', {headers: {'Authorization': `Bearer ${userDetail?.token}`}})
        console.log(response.status, response.statusText)
    } catch (error){
        console.error(error)
    }
    return NextResponse.json("toto")
}