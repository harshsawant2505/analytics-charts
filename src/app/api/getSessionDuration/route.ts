import  data from "@/app/data/sessionduration.json"
import { NextResponse } from "next/server"
export async function GET (){

    return NextResponse.json({sessionduration:data})

         
       

}