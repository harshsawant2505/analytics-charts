import  data from "@/app/data/pageviews.json"
import { NextResponse } from "next/server"
export async function GET (){

    return NextResponse.json({pageviews: data})

         
       

}