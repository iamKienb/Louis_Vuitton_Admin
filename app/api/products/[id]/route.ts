 
// relation one collection luu many product

import Product  from '@/lib/model/Product';
import { connectToDB } from "@/lib/connect";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Collection from '@/lib/model/Collection';
export const GET = async (  req: NextRequest,{ params }: { params: { id: string } }) => {
    try{

        await connectToDB()
        const product = await Product.findById(params.id).populate({path: 'collections', model: Collection})
        
       if (!product) {
        return new NextResponse(
          JSON.stringify({ message: "product not found" }),
          { status: 404 }
        );
      }
      return new NextResponse(JSON.stringify(product), { status: 200 ,
        headers:{
          "Access-Control-Allow-Origin": `${process.env.HOME_STORE_URL}`,
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers": "Content-Type"   
        }
      });

    }catch(err){
        console.log("[productId_GET]", err);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export const POST = async (
    req: NextRequest,
    { params }: { params: { id: string } }
  ) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const product = await Product.findById(params.id);

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    const addedCollections = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );
    // included in new data, but not included in the previous data

    const removedCollections = product.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );
    // included in previous data, but not included in the new data

    // Update collections
    await Promise.all([
      // Update added collections with this product
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      // Update removed collections without this product
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      ),
    ]);
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        collections,
        tags,
        sizes,
        colors,
        price,
        expense,
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[ProductId_POST:]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },

) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("unauthorize", { status: 401 });
    }
    const id = params.id
    if(!id) return new NextResponse("id not found",{status: 404})
    await connectToDB();
  
  const product = await Product.findById(id);
  if(!product) return new NextResponse("product not found", {status: 404})
    
    
    await Promise.all(
      product.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    );
    
    await Product.findByIdAndDelete(id);



    return new NextResponse("Product is deleted", { status: 200 });
  } catch (err) {
    console.log("[ProductId_DELETE:]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
