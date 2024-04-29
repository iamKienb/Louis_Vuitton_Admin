"use client";
import { CollectionColumns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/customs/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const router = useRouter()
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);


  return (
    <div className="px-10 py-10">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collection</p>
        <Button type ='button' className="bg-blue-1 text-white-1" onClick={() =>  router.push('/collections/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <DataTable columns={CollectionColumns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
