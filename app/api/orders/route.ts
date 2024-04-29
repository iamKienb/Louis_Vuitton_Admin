import { clsx } from 'clsx';
import { connectToDB } from "@/lib/connect";
import Customer from "@/lib/model/Customer";
import Order from "@/lib/model/Order";
import { NextRequest, NextResponse } from "next/server";
import {format} from "date-fns"
export const GET = async(req:NextRequest) =>{
    try{
        await connectToDB()
        const orders = await Order.find().sort({createdAt:"desc"})
        const orderDetail = await Promise.all(orders.map( async (order) => {
            const customer = await Customer.findOne({clerkId: order.customerClerkId})
            return {
                _id: order._id,
                customer: customer.name,
                products: order.products.length,
                totalAmount: order.totalAmount,
                createdAt: format(order.createdAt,"MMM do,yyy")
            }
        }))
        return NextResponse.json(orderDetail, {status:200})
    }catch(e){
        console.log("[ORDERS_GET_ERROR]", e)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}