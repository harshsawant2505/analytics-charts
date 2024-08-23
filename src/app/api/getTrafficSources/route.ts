import  data from "@/app/data/trafficsources.json"
import { NextResponse } from "next/server"
export async function GET (){

    return NextResponse.json({trafficsources: data})

}