import { connectToDB } from "@/lib/connect";
import Collection from "@/lib/model/Collection";
import Product from "@/lib/model/Product";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.id);

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
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

    let collection = await Collection.findById(params.id);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }
    const { title, description, image, path } = await req.json();
    console.log(title, description, image,'PATH',path)
    if (!title || !description || !image || !path) {
      return new NextResponse("one of fields are required", { status: 400 });
    }
    collection = await Collection.findByIdAndUpdate(
      params.id,
      { title, description, image, path },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[CollectionId_POST:]", err);
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
    await connectToDB();
    await Collection.findByIdAndDelete(params.id);
    await Product.updateMany({
      $pull:{
        collections: params.id
      }
    })
    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (err) {
    console.log("[CollectionId_DELETE:]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
