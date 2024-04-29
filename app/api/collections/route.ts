import  {connectToDB}  from "@/lib/connect";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import Collection from "@/lib/model/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await connectToDB()

    const { title, description, image, path } = await req.json()

    const existingCollection = await Collection.findOne({ title })
    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 })
    }

    if (!title) {
      return new NextResponse("Title and image are required", { status: 400 })
    }
    console.log('1',title, '2',description, '3' ,image, '4',path)

    const newCollection = await Collection.create({
      title:title,
      description,
      image,
      path,
    })

    console.log('colletion',newCollection)

    return NextResponse.json(newCollection, { status: 200 })
  } catch (err) {
    console.log("[collections_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()

    const collections = await Collection.find().sort({ createdAt: "asc" })

    return NextResponse.json(collections, { status: 200 })
  } catch (err) {

    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
