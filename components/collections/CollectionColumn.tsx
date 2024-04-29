import { ColumnDef } from "@tanstack/react-table";
import DeleteButton from "../customs/DeleteButton";
import Link from "next/link";
import { CollectionType } from "@/lib/types";

export const CollectionColumns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title", // lấy dự liệu từ title
    header: "Title", // Tên bảng là Title
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-red-1 cursor-pointer"
      >
        {row.original.title}
      </Link>
    ), // hiển thị dữ liệu qua từng hàng
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    header: "Delete",
    id: "actions",
    cell: ({ row }) => (
      <DeleteButton id={row.original._id} item="collections" />
    ),
  },
];
