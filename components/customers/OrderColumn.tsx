"use client";

import { CustomerType, OrderColumnType, ProductType } from "@/lib/types";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";

export const CustomersColumns: ColumnDef<CustomerType>[] = [

  {
    accessorKey: "clerkId",
    header: "Clerk ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "orders",
    header: "Order",
  },


];