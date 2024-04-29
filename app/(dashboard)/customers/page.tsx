"use client";
import { CustomersColumns } from '@/components/customers/OrderColumn'
import { DataTable } from '@/components/customs/DataTable'
import { Loader } from '@/components/ui/Loader';

import { Separator } from '@radix-ui/react-separator'
import React, { useEffect, useState } from 'react'

const Customer =  () => {
    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
  
    const getCustomers = async () => {
      try {
        const res = await fetch("/api/customers", {
          method: "GET",
        });
        const data = await res.json();
        console.log(data)
        setCustomers(data);
        setLoading(false);
      } catch (err) {
        console.log("[CUSTOMERS_GET_ERR]", err);
      }
    };
    useEffect(() => {
        getCustomers();
    }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className='px-10 py-5'>
        <p className='text-heading3-bold'>Customer</p>
        <Separator className='my-5'/>
        <DataTable columns={CustomersColumns} data={customers} searchKey='name'/>
    </div>
  )
}
export const dynamic = "force-dynamic";

export default Customer