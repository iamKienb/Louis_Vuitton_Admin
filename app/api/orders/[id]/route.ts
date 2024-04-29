import { connectToDB } from "@/lib/connect";
import Customer from "@/lib/model/Customer";
import Order from "@/lib/model/Order";
import Product from "@/lib/model/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req:NextRequest, {params}: {params:{id:String}}) =>{
    try{
        await connectToDB()
        const orderDetails = await Order.findById(params.id).populate({
            path: 'products.product',
            model:Product
        })
        if(!orderDetails) {
            return new NextResponse(JSON.stringify({message: "NOT FOUND"}), {status: 404})
        }
        const customer = await Customer.findOne({clerkId: orderDetails.customerClerkId})
        

        return NextResponse.json({orderDetails,customer}, {status:200})
    }catch(e){
        console.log("[ORDER_GET_ERROR]", e)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}