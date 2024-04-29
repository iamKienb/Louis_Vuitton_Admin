import { connectToDB } from "@/lib/connect";
import Collection from "@/lib/model/Collection";
import Product from "@/lib/model/Product";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
      await connectToDB();
  
      const products = await Product.find({category: 'Sneaker'})
        .sort({ createdAt: "asc" })
        .populate({ path: "collections", model: Collection });
  
      return NextResponse.json(products, { status: 200 });
    } catch (err) {
      console.log("[products_GET]", err);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };
  