import mongoose, { Types } from "mongoose";

export type CollectionType ={
    _id:string,
    title:string,
    description:string,
    image:string,
    path:string,
    products: ProductType[]
}
export type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [CollectionType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: number;
    expense: number;
    createdAt: Date;
    updatedAt: Date;

  }
  
  export  type OrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    createdAt: string;
  }
  
  export type OrderItemType = {
    product: ProductType
    color: string;
    size: string;
    quantity: number;
  }
  
  export type CustomerType = {
    _id:String;
    clerkId: string;
    name: string;
    email: string;
    orders: number;
  }