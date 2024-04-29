"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { OrderItemType, ProductType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/customs/DataTable";
import { Loader } from "@/components/ui/Loader";
import { ProductColumns } from "@/components/products/ProductColumn";
import { OrdersColumns } from "@/components/orders/OrderColumn";

const Order = () => {


  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data)
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log("[ORDER_GET_ERR]", err);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Orders</p>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={OrdersColumns} data={orders} searchKey="_id" />
    </div>
  );
};

export const dynamic = "force-dynamic";
export default Order;