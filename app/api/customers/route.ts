import { connectToDB } from "@/lib/connect"
import Customer from "@/lib/model/Customer"
import { NextRequest, NextResponse } from "next/server"

export const GET = async(req:NextRequest) =>{
    try{
        await connectToDB()
        const customer = await Customer.find().sort({createdAt: 'desc'})

        return NextResponse.json({
            customer
        },{status:200})
    }catch(e){
        console.log("[ORDERS_GET_ERROR]", e)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}