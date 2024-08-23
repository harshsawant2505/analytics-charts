import  data from "@/app/data/bouncerate.json"
import { NextResponse } from "next/server"
export async function GET (){

    return NextResponse.json({bouncerate: data})

}