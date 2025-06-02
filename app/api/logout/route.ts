import { decrypt } from "@/services/hashData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    try {
        const session = request.cookies.get('session')?.value ?? ""
        const userInfo =  await decrypt(session)
        const userDetail = userInfo?.userDetail
        await fetch('http://localhost:8080/api/auth/logout', {headers: {'Authorization': `Bearer ${userDetail?.token}`}})
    } catch (error){
        console.error(error)
    }
    return NextResponse.json("toto")
}