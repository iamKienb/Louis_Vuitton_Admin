"use client";

import { OrderColumnType, OrderItemType, ProductType } from "@/lib/types";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

export const OrdersItemsColumns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original.product._id}`}
        className="hover:text-red-1"
      >
        {row.original.product.title}
      </Link>
    ),
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },


];