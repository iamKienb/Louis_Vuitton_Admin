"use client"
import ProductForm from '@/components/products/ProductForm'
import { Loader } from '@/components/ui/Loader'
import { ProductType } from '@/lib/types'
import React, { useEffect, useState } from 'react'


const ProductDetail = ({params}: {params: {id:string}}) => {
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState<ProductType | null>(null)
    const getProductById = async() =>{
        const res = await fetch(`/api/products/${params.id}`,{
            method: 'GET',
        })
        const data = await res.json()
        setProduct(data)
        setLoading(false)
    }   
    useEffect(() =>{
        getProductById()
    }, [])
    console.log('product', product)
  return loading ? <Loader/>: (
    <div>
        <ProductForm initialData={product}/>
    </div>
  )
}

export default ProductDetail