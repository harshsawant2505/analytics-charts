import  data from "@/app/data/data.json"
import { NextResponse } from "next/server"
export async function GET (){

    return NextResponse.json(data)

         
       

}