import  data from "@/app/data/deviceusage.json"
import { NextResponse } from "next/server"
export async function GET (){

    return NextResponse.json({deviceusage: data})

}