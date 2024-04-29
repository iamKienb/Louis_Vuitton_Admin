"use client";

import { OrderColumnType, ProductType } from "@/lib/types";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

export const OrdersColumns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },

];