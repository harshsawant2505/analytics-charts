import  data from "@/app/data/pageviews.json"
import { NextResponse } from "next/server"
export async function GET (){
    console.log('This is the pageviews')
    return NextResponse.json({pageviews: data})

         


}